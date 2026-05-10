'use client';

import { useState, useRef, useEffect, useCallback, forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../lib/utils.js';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  searchable?: boolean;
  renderOption?: (option: SelectOption) => React.ReactNode;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({ className, options, value, onChange, placeholder = 'Select...', disabled, error, label, searchable = false, renderOption, ...props }, ref) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const selected = options.find((o) => o.value === value);
    const filtered = searchable && search
      ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
      : options;

    const close = useCallback(() => {
      setOpen(false);
      setSearch('');
      setHighlightedIndex(-1);
    }, []);

    useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) close();
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [close]);

    useEffect(() => {
      if (open && searchable) inputRef.current?.focus();
    }, [open, searchable]);

    const selectOption = (opt: SelectOption) => {
      if (opt.disabled) return;
      onChange?.(opt.value);
      close();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      switch (e.key) {
        case 'Enter':
          e.preventDefault();
          if (!open) { setOpen(true); return; }
          if (highlightedIndex >= 0 && filtered[highlightedIndex]) selectOption(filtered[highlightedIndex]);
          break;
        case 'Escape':
          e.preventDefault();
          close();
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!open) { setOpen(true); return; }
          setHighlightedIndex((i) => {
            let next = i + 1;
            while (next < filtered.length && filtered[next]?.disabled) next++;
            return next < filtered.length ? next : i;
          });
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((i) => {
            let next = i - 1;
            while (next >= 0 && filtered[next]?.disabled) next--;
            return next >= 0 ? next : i;
          });
          break;
      }
    };

    useEffect(() => {
      if (highlightedIndex >= 0 && listRef.current) {
        const el = listRef.current.children[highlightedIndex] as HTMLElement | undefined;
        el?.scrollIntoView({ block: 'nearest' });
      }
    }, [highlightedIndex]);

    const inputId = label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div ref={ref} className={cn('space-y-1.5', className)} {...props}>
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[var(--text-main)]">
            {label}
          </label>
        )}
        <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
          {/* Trigger */}
          <button
            type="button"
            id={inputId}
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-controls="select-listbox"
            disabled={disabled}
            onClick={() => !disabled && setOpen(!open)}
            className={cn(
              'flex h-10 w-full items-center justify-between rounded-lg border bg-[var(--surface)] px-3 py-2 text-sm backdrop-blur-sm transition-all duration-200 outline-none text-left',
              'border-[var(--surface-border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-[var(--danger)] focus:border-[var(--danger)] focus:ring-[var(--danger)]/20',
              open && 'border-[var(--primary)] ring-2 ring-[var(--primary)]/20'
            )}
          >
            <span className={selected ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)]'}>
              {selected ? selected.label : placeholder}
            </span>
            <svg
              className={cn('h-4 w-4 text-[var(--text-muted)] transition-transform duration-200', open && 'rotate-180')}
              viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            >
              <path d="M4 6l4 4 4-4" />
            </svg>
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute z-50 mt-1 w-full rounded-lg border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl shadow-2xl overflow-hidden">
              {searchable && (
                <div className="p-2 border-b border-white/[0.08]">
                  <input
                    ref={inputRef}
                    type="text"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setHighlightedIndex(0); }}
                    placeholder="Search..."
                    className="w-full rounded-md border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--primary)]"
                    aria-label="Search options"
                  />
                </div>
              )}
              <ul
                ref={listRef}
                id="select-listbox"
                role="listbox"
                className="max-h-60 overflow-y-auto py-1"
              >
                {filtered.length === 0 && (
                  <li className="px-3 py-2 text-sm text-[var(--text-muted)] text-center">No options found</li>
                )}
                {filtered.map((opt, i) => (
                  <li
                    key={opt.value}
                    role="option"
                    aria-selected={opt.value === value}
                    aria-disabled={opt.disabled}
                    onClick={() => selectOption(opt)}
                    onMouseEnter={() => setHighlightedIndex(i)}
                    className={cn(
                      'px-3 py-2 text-sm cursor-pointer transition-colors duration-100',
                      opt.value === value && 'text-[var(--primary)] bg-[var(--primary)]/10',
                      opt.value !== value && 'text-[var(--text-main)]',
                      i === highlightedIndex && 'bg-white/10',
                      opt.disabled && 'opacity-40 cursor-not-allowed'
                    )}
                  >
                    {renderOption ? renderOption(opt) : opt.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs text-[var(--danger)]" role="alert">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
