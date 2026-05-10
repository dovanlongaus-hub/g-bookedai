'use client';

import { Search as SearchIcon, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Suspense,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  searchIndex,
  type SearchCategory,
  type SearchItem,
} from '@/data/search-index';

type Filter = 'All' | SearchCategory;

const FILTERS: Filter[] = [
  'All',
  'Service',
  'Agent',
  'Toolkit',
  'Solution',
  'Academy',
  'Resource',
  'Governance',
  'Community',
  'Blog',
];

const SUGGESTIONS = [
  'AI mentor',
  'ROI calculator',
  'healthcare',
  'prompt engineering',
  'email assistant',
  'governance',
];

const MAX_RESULTS = 30;

type ScoredItem = SearchItem & { __score: number };

/** Lower-cased, token-aware ranker. */
function scoreItem(item: SearchItem, query: string, tokens: string[]): number {
  if (!query) return 0;
  const titleLc = item.title.toLowerCase();
  const descLc = item.description.toLowerCase();
  const keywordsLc = item.keywords.map((k) => k.toLowerCase());
  const keywordsJoined = keywordsLc.join(' ');

  let score = 0;

  // Full-phrase match in title
  if (titleLc.includes(query)) score += 10;
  // Full-phrase match in description
  if (descLc.includes(query)) score += 4;
  // Full-phrase in keywords
  if (keywordsJoined.includes(query)) score += 3;

  // All-tokens-match bonuses
  const allInTitle = tokens.every((t) => titleLc.includes(t));
  const allInDesc = tokens.every((t) => descLc.includes(t));
  const allInKw = tokens.every((t) => keywordsJoined.includes(t));
  if (allInTitle) score += 5;
  if (allInDesc) score += 3;
  if (allInKw) score += 2;

  // Per-token partial match (cheap fuzzy)
  for (const t of tokens) {
    if (!t) continue;
    if (titleLc.includes(t)) score += 1.5;
    if (descLc.includes(t)) score += 0.75;
    if (keywordsLc.some((k) => k.includes(t))) score += 0.5;
    // Industry / difficulty bonus if tokens match
    if (item.industry && item.industry.toLowerCase().includes(t)) score += 1;
    if (item.difficulty && item.difficulty.toLowerCase().includes(t)) score += 0.5;
  }

  return score;
}

/** Highlight matched tokens within a snippet. Safe — splits, never injects HTML. */
function Highlight({ text, tokens }: { text: string; tokens: string[] }) {
  if (tokens.length === 0 || tokens.every((t) => !t)) return <>{text}</>;
  const validTokens = tokens.filter((t) => t.length > 1);
  if (validTokens.length === 0) return <>{text}</>;

  // Build a regex that matches any token (case-insensitive). Escape special chars.
  const escaped = validTokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const re = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = text.split(re);
  return (
    <>
      {parts.map((part, i) =>
        re.test(part) ? (
          <mark
            key={i}
            className="bg-amber-200/70 text-slate-900 rounded px-0.5"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function SearchClientInner({ initialQuery = '' }: { initialQuery?: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const initialFromUrl = params.get('q') ?? initialQuery;

  const [query, setQuery] = useState(initialFromUrl);
  const [filter, setFilter] = useState<Filter>('All');
  const deferredQuery = useDeferredValue(query);
  const inputRef = useRef<HTMLInputElement>(null);

  // Track event after debounce window
  const trackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync URL ?q= when query stabilises (debounced)
  useEffect(() => {
    const t = setTimeout(() => {
      const trimmed = deferredQuery.trim();
      const current = params.get('q') ?? '';
      if (trimmed === current) return;
      const sp = new URLSearchParams(params.toString());
      if (trimmed) sp.set('q', trimmed);
      else sp.delete('q');
      router.replace(`/search${sp.toString() ? `?${sp.toString()}` : ''}`, {
        scroll: false,
      });
    }, 250);
    return () => clearTimeout(t);
  }, [deferredQuery, params, router]);

  // Fire analytics event after debounce
  useEffect(() => {
    if (trackTimer.current) clearTimeout(trackTimer.current);
    const trimmed = deferredQuery.trim();
    if (!trimmed) return;
    trackTimer.current = setTimeout(() => {
      try {
        if (typeof window !== 'undefined') {
          const w = window as unknown as {
            gtag?: (cmd: string, event: string, params: Record<string, unknown>) => void;
          };
          if (typeof w.gtag === 'function') {
            w.gtag('event', 'search', { search_term: trimmed });
          }
        }
      } catch {
        // analytics is best-effort
      }
    }, 600);
    return () => {
      if (trackTimer.current) clearTimeout(trackTimer.current);
    };
  }, [deferredQuery]);

  // Compute results (memoised on deferred query + filter)
  const { results, durationMs } = useMemo(() => {
    const start =
      typeof performance !== 'undefined' ? performance.now() : Date.now();
    const q = deferredQuery.trim().toLowerCase();
    const tokens = q.split(/\s+/).filter(Boolean);

    const pool =
      filter === 'All'
        ? searchIndex
        : searchIndex.filter((i) => i.category === filter);

    let scored: ScoredItem[];
    if (!q) {
      // Empty query: just show all items in pool, ordered by category then title
      scored = pool.map((i) => ({ ...i, __score: 0 }));
    } else {
      scored = pool
        .map((i) => ({ ...i, __score: scoreItem(i, q, tokens) }))
        .filter((i) => i.__score > 0)
        .sort((a, b) => b.__score - a.__score);
    }

    const top = scored.slice(0, MAX_RESULTS);
    const end =
      typeof performance !== 'undefined' ? performance.now() : Date.now();
    return { results: top, durationMs: Math.max(0, end - start) };
  }, [deferredQuery, filter]);

  const tokens = deferredQuery
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  const trimmedQuery = deferredQuery.trim();
  const hasQuery = trimmedQuery.length > 0;

  return (
    <div
      className="container"
      style={{ paddingTop: '4rem', paddingBottom: '4rem' }}
    >
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="hero-title" style={{ fontSize: '2.5rem' }}>
          Search LongCare
        </h1>
        <p
          style={{
            color: 'var(--text-muted)',
            marginTop: '0.5rem',
            fontSize: '1rem',
          }}
        >
          Find services, agents, learning paths, industry solutions, governance,
          and resources.
        </p>
      </header>

      {/* Search input */}
      <div role="search" style={{ maxWidth: 640, margin: '0 auto 1.25rem' }}>
        <label htmlFor="site-search" className="sr-only">
          Search LongCare
        </label>
        <div style={{ position: 'relative' }}>
          <SearchIcon
            aria-hidden="true"
            className="size-5"
            style={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
              pointerEvents: 'none',
            }}
          />
          <input
            id="site-search"
            ref={inputRef}
            role="searchbox"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search agents, toolkits, courses, industries…"
            aria-label="Search LongCare"
            aria-controls="search-results"
            autoFocus
            style={{
              width: '100%',
              padding: '1rem 3rem 1rem 3rem',
              background: 'var(--card-bg, rgba(255,255,255,0.03))',
              border: '1px solid var(--card-border, rgba(255,255,255,0.08))',
              borderRadius: 12,
              color: 'inherit',
              fontSize: '1.05rem',
              outline: 'none',
            }}
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                padding: 4,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6,
              }}
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter chips */}
      <div
        role="tablist"
        aria-label="Filter by category"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          justifyContent: 'center',
          maxWidth: 800,
          margin: '0 auto 1.5rem',
        }}
      >
        {FILTERS.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f)}
              style={{
                padding: '6px 14px',
                borderRadius: 999,
                fontSize: '0.85rem',
                fontWeight: 500,
                border: '1px solid',
                borderColor: active
                  ? 'var(--accent, #0369a1)'
                  : 'var(--card-border, rgba(255,255,255,0.12))',
                background: active
                  ? 'var(--accent, #0369a1)'
                  : 'var(--card-bg, transparent)',
                color: active ? '#fff' : 'inherit',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Counts row */}
      <div
        aria-live="polite"
        style={{
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.85rem',
          marginBottom: '1.25rem',
        }}
      >
        {hasQuery ? (
          <>
            {results.length} result{results.length !== 1 ? 's' : ''} for{' '}
            <strong>“{trimmedQuery}”</strong>
            {filter !== 'All' && <> in {filter}</>} ·{' '}
            {durationMs.toFixed(durationMs < 10 ? 1 : 0)}ms
          </>
        ) : (
          <>
            Showing {results.length} item{results.length !== 1 ? 's' : ''}
            {filter !== 'All' && <> in {filter}</>} · type to search
          </>
        )}
      </div>

      {/* Results */}
      <div
        id="search-results"
        role="listbox"
        aria-label="Search results"
        style={{ maxWidth: 760, margin: '0 auto' }}
      >
        {results.length === 0 && hasQuery && (
          <div
            style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              color: 'var(--text-muted)',
            }}
          >
            <p style={{ fontSize: '1.05rem', marginBottom: '0.75rem' }}>
              No results for <strong>“{trimmedQuery}”</strong>.
            </p>
            <p style={{ marginBottom: '1.25rem' }}>Try one of these:</p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 8,
                justifyContent: 'center',
              }}
            >
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setQuery(s)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 999,
                    background: 'var(--card-bg, rgba(255,255,255,0.05))',
                    border:
                      '1px solid var(--card-border, rgba(255,255,255,0.12))',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    color: 'inherit',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
            <p style={{ marginTop: '1.5rem' }}>
              Or{' '}
              <Link
                href="/contact"
                style={{ color: 'var(--accent)', textDecoration: 'underline' }}
              >
                contact us
              </Link>{' '}
              for help.
            </p>
          </div>
        )}

        {results.map((r) => (
          <Link
            key={r.url}
            href={r.url}
            role="option"
            aria-selected="false"
            className="card"
            style={{
              display: 'block',
              textDecoration: 'none',
              color: 'inherit',
              marginBottom: '0.75rem',
              padding: '1.25rem 1.5rem',
              borderRadius: 12,
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: 12,
                alignItems: 'flex-start',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--accent)',
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  fontWeight: 600,
                  border: '1px solid currentColor',
                  padding: '2px 8px',
                  borderRadius: 999,
                  flexShrink: 0,
                }}
              >
                {r.category}
              </span>
              {r.industry && (
                <span
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    border: '1px solid var(--card-border, rgba(255,255,255,0.12))',
                    padding: '2px 8px',
                    borderRadius: 999,
                    flexShrink: 0,
                  }}
                >
                  {r.industry}
                </span>
              )}
              {r.difficulty && (
                <span
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    border: '1px solid var(--card-border, rgba(255,255,255,0.12))',
                    padding: '2px 8px',
                    borderRadius: 999,
                    flexShrink: 0,
                  }}
                >
                  {r.difficulty}
                </span>
              )}
            </div>
            <h3
              style={{
                fontSize: '1.05rem',
                fontWeight: 600,
                marginTop: 8,
                marginBottom: 4,
              }}
            >
              <Highlight text={r.title} tokens={tokens} />
            </h3>
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.9rem',
                marginBottom: 6,
                lineHeight: 1.5,
              }}
            >
              <Highlight text={r.description} tokens={tokens} />
            </p>
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.75rem',
                opacity: 0.7,
              }}
            >
              {r.url}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

/**
 * Public wrapper — wraps useSearchParams consumer in Suspense as required by Next 15.
 */
export function SearchClient({ initialQuery = '' }: { initialQuery?: string }) {
  return (
    <Suspense
      fallback={
        <div
          className="container"
          style={{ paddingTop: '4rem', paddingBottom: '4rem', textAlign: 'center' }}
        >
          <p style={{ color: 'var(--text-muted)' }}>Loading search…</p>
        </div>
      }
    >
      <SearchClientInner initialQuery={initialQuery} />
    </Suspense>
  );
}
