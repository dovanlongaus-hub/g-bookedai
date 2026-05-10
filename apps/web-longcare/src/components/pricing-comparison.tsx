'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import {
  skuCatalog,
  TIER_LABELS,
  CATEGORY_LABELS,
  type SKU,
  type SKUTier,
  type SKUCategory,
} from '@/data/sku-catalog';

type Props = {
  filterTier?: SKUTier | 'all';
  showFilter?: boolean;
  showCategoryFilter?: boolean;
  items?: SKU[];
};

type TierFilter = SKUTier | 'all';
type CategoryFilter = SKUCategory | 'all';

export function PricingComparison({
  filterTier = 'all',
  showFilter = true,
  showCategoryFilter = false,
  items,
}: Props) {
  const [activeTier, setActiveTier] = useState<TierFilter>(filterTier);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const source = items ?? skuCatalog;

  const visible = useMemo(() => {
    return source.filter((s) => {
      const tierOk = activeTier === 'all' || s.tiers.includes(activeTier);
      const categoryOk = activeCategory === 'all' || s.category === activeCategory;
      return tierOk && categoryOk;
    });
  }, [source, activeTier, activeCategory]);

  return (
    <div>
      {showFilter && (
        <FilterChips
          label="Audience"
          options={[
            { value: 'all', label: 'All' },
            { value: 'individual', label: TIER_LABELS.individual },
            { value: 'startup', label: TIER_LABELS.startup },
            { value: 'sme', label: TIER_LABELS.sme },
            { value: 'organisation', label: TIER_LABELS.organisation },
          ]}
          active={activeTier}
          onChange={(v) => setActiveTier(v as TierFilter)}
        />
      )}

      {showCategoryFilter && (
        <FilterChips
          label="Type"
          options={[
            { value: 'all', label: 'All' },
            { value: 'consult', label: CATEGORY_LABELS.consult },
            { value: 'session', label: CATEGORY_LABELS.session },
            { value: 'package', label: CATEGORY_LABELS.package },
            { value: 'subscription', label: CATEGORY_LABELS.subscription },
            { value: 'engagement', label: CATEGORY_LABELS.engagement },
            { value: 'workshop', label: CATEGORY_LABELS.workshop },
            { value: 'bootcamp', label: CATEGORY_LABELS.bootcamp },
          ]}
          active={activeCategory}
          onChange={(v) => setActiveCategory(v as CategoryFilter)}
        />
      )}

      <div className="mt-2 mb-6 text-sm text-slate-600">
        Showing <span className="font-semibold text-slate-900">{visible.length}</span> of{' '}
        <span className="font-semibold text-slate-900">{source.length}</span> services. All prices AUD inc GST.
      </div>

      {visible.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
          <p className="text-slate-700 font-medium">No services match these filters.</p>
          <button
            type="button"
            onClick={() => {
              setActiveTier('all');
              setActiveCategory('all');
            }}
            className="mt-3 text-sm text-sky-700 hover:underline"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <Grid items={visible} />
      )}
    </div>
  );
}

function FilterChips({
  label,
  options,
  active,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  active: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mb-4">
      <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-2">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = active === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition border ${
                selected
                  ? 'bg-sky-700 text-white border-sky-700 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
              aria-pressed={selected}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Grid({ items }: { items: SKU[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((sku) => (
        <SKUCard key={sku.id} sku={sku} />
      ))}
    </div>
  );
}

function SKUCard({ sku }: { sku: SKU }) {
  const isExternal = sku.cta.href.startsWith('http');

  return (
    <article
      className={`relative flex flex-col bg-white border rounded-xl p-6 sm:p-8 shadow-sm transition hover:shadow-md ${
        sku.highlight ? 'border-sky-700 ring-1 ring-sky-700/20' : 'border-slate-200'
      }`}
    >
      {sku.badge && (
        <div className="absolute -top-3 left-6">
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
              sku.highlight
                ? 'bg-sky-700 text-white'
                : sku.badge === 'Free'
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                : 'bg-slate-900 text-white'
            }`}
          >
            {sku.highlight && <Sparkles className="size-3" aria-hidden />}
            {sku.badge}
          </span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-3">
        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
          {CATEGORY_LABELS[sku.category]}
        </span>
        {sku.tiers.slice(0, 3).map((t) => (
          <span key={t} className="px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 font-medium">
            {TIER_LABELS[t]}
          </span>
        ))}
      </div>

      <h3 className="font-heading text-xl font-semibold text-slate-900 leading-tight">
        <Link href={sku.url} className="hover:text-sky-700 no-underline">
          {sku.name}
        </Link>
      </h3>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl font-bold text-slate-900">{sku.priceLabel}</span>
        <span className="text-xs text-slate-500">{sku.unit}</span>
      </div>

      <p className="mt-3 text-sm text-slate-600 leading-relaxed">{sku.description}</p>

      <ul className="mt-4 space-y-2 flex-1">
        {sku.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2 text-sm text-slate-700">
            <CheckCircle2 className="size-4 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col gap-2">
        {isExternal ? (
          <a
            href={sku.cta.href}
            className={`px-4 py-2.5 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2 no-underline transition ${
              sku.highlight
                ? 'bg-sky-700 hover:bg-sky-600 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            {sku.cta.label}
            <ArrowRight className="size-4" aria-hidden />
          </a>
        ) : (
          <Link
            href={sku.cta.href}
            className={`px-4 py-2.5 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2 no-underline transition ${
              sku.highlight
                ? 'bg-sky-700 hover:bg-sky-600 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            {sku.cta.label}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        )}
        <Link
          href={sku.url}
          className="text-xs text-slate-500 hover:text-sky-700 hover:underline text-center"
        >
          Learn more
        </Link>
      </div>
    </article>
  );
}
