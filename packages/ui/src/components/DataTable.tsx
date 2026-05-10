'use client';

import { useState, useMemo, type ReactNode } from 'react';
import { cn } from '../lib/utils.js';

export interface ColumnDef<T> {
  accessor: keyof T | ((row: T) => unknown);
  header: string;
  cell?: (row: T) => ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  keyField: keyof T;
  selectable?: boolean;
  selectedKeys?: Set<string | number>;
  onSelectionChange?: (keys: Set<string | number>) => void;
  loading?: boolean;
  emptyMessage?: string;
  pageSize?: number;
  className?: string;
}

type SortDir = 'asc' | 'desc' | null;

function getValue<T>(row: T, accessor: ColumnDef<T>['accessor']): unknown {
  if (typeof accessor === 'function') return accessor(row);
  return row[accessor];
}

export function DataTable<T>({
  columns,
  data,
  keyField,
  selectable = false,
  selectedKeys: controlledSelected,
  onSelectionChange,
  loading = false,
  emptyMessage = 'No data available',
  pageSize: initialPageSize = 10,
  className,
}: DataTableProps<T>) {
  const [sortCol, setSortCol] = useState<number | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [internalSelected, setInternalSelected] = useState<Set<string | number>>(new Set());

  const selected = controlledSelected ?? internalSelected;
  const setSelected = (keys: Set<string | number>) => {
    if (onSelectionChange) onSelectionChange(keys);
    else setInternalSelected(keys);
  };

  const sorted = useMemo(() => {
    if (sortCol === null || sortDir === null) return data;
    const col = columns[sortCol];
    return [...data].sort((a, b) => {
      const va = getValue(a, col.accessor);
      const vb = getValue(b, col.accessor);
      const av = va == null ? '' : va;
      const bv = vb == null ? '' : vb;
      const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [data, sortCol, sortDir, columns]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice(page * pageSize, (page + 1) * pageSize);

  const toggleSort = (i: number) => {
    if (!columns[i].sortable) return;
    if (sortCol === i) {
      setSortDir((d) => (d === 'asc' ? 'desc' : d === 'desc' ? null : 'asc'));
      if (sortDir === 'desc') setSortCol(null);
    } else {
      setSortCol(i);
      setSortDir('asc');
    }
  };

  const allPageKeys = paginated.map((r) => r[keyField] as string | number);
  const allSelected = allPageKeys.length > 0 && allPageKeys.every((k) => selected.has(k));
  const toggleAll = () => {
    const next = new Set(selected);
    if (allSelected) allPageKeys.forEach((k) => next.delete(k));
    else allPageKeys.forEach((k) => next.add(k));
    setSelected(next);
  };
  const toggleRow = (key: string | number) => {
    const next = new Set(selected);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setSelected(next);
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className={cn('w-full rounded-xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl overflow-hidden', className)}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.08]">
              {columns.map((col, i) => (
                <th key={i} className="px-4 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, r) => (
              <tr key={r} className="border-b border-white/[0.06]">
                {columns.map((_, c) => (
                  <td key={c} className="px-4 py-3">
                    <div className="h-4 w-3/4 rounded bg-white/[0.06] animate-pulse" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className={cn('w-full rounded-xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.08]">
              {selectable && (
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="rounded border-white/20 bg-white/5 text-[var(--primary)] focus:ring-[var(--primary)]/50"
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((col, i) => (
                <th
                  key={i}
                  style={col.width ? { width: col.width } : undefined}
                  className={cn(
                    'px-4 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider',
                    col.sortable && 'cursor-pointer select-none hover:text-[var(--text-main)] transition-colors'
                  )}
                  onClick={() => toggleSort(i)}
                  aria-sort={sortCol === i ? (sortDir === 'asc' ? 'ascending' : sortDir === 'desc' ? 'descending' : undefined) : undefined}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {col.header}
                    {col.sortable && sortCol === i && sortDir && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className={sortDir === 'desc' ? 'rotate-180' : ''}>
                        <path d="M6 2l4 5H2l4-5z" />
                      </svg>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 && (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-12 text-center text-[var(--text-muted)]">
                  {emptyMessage}
                </td>
              </tr>
            )}
            {paginated.map((row) => {
              const key = row[keyField] as string | number;
              return (
                <tr
                  key={key}
                  className={cn(
                    'border-b border-white/[0.06] transition-colors duration-100 hover:bg-white/[0.04]',
                    selected.has(key) && 'bg-[var(--primary)]/5'
                  )}
                >
                  {selectable && (
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.has(key)}
                        onChange={() => toggleRow(key)}
                        className="rounded border-white/20 bg-white/5 text-[var(--primary)] focus:ring-[var(--primary)]/50"
                        aria-label={`Select row ${key}`}
                      />
                    </td>
                  )}
                  {columns.map((col, i) => (
                    <td key={i} className="px-4 py-3 text-[var(--text-main)]">
                      {col.cell ? col.cell(row) : String(getValue(row, col.accessor) ?? '')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.08] text-xs text-[var(--text-muted)]">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(0); }}
            className="rounded border border-white/[0.08] bg-white/[0.04] px-2 py-1 text-[var(--text-main)] outline-none focus:border-[var(--primary)]"
          >
            {[10, 25, 50].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span>
            {sorted.length === 0 ? '0 of 0' : `${page * pageSize + 1}-${Math.min((page + 1) * pageSize, sorted.length)} of ${sorted.length}`}
          </span>
          <button
            type="button"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-md p-1 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M10 4l-4 4 4 4" />
            </svg>
          </button>
          <button
            type="button"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-md p-1 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 4l4 4-4 4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
