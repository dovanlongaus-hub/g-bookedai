'use client';

import { Search, Layers, User as UserIcon, Users, Crown } from 'lucide-react';

export type ServiceCategory = 'all' | 'group' | '1on1' | 'premium';

interface ServiceSearchFilterProps {
  query: string;
  onQueryChange: (q: string) => void;
  category: ServiceCategory;
  onCategoryChange: (c: ServiceCategory) => void;
}

const CATEGORIES: { id: ServiceCategory; label: string; icon: React.FC<{ size?: number }> }[] = [
  { id: 'all', label: 'All', icon: Layers },
  { id: 'group', label: 'Group', icon: Users },
  { id: '1on1', label: '1-on-1', icon: UserIcon },
  { id: 'premium', label: 'Premium', icon: Crown },
];

export function ServiceSearchFilter({
  query,
  onQueryChange,
  category,
  onCategoryChange,
}: ServiceSearchFilterProps) {
  return (
    <div className="flex flex-col gap-3 mb-6">
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search services…"
          className="w-full h-12 pl-10 pr-4 rounded-xl bg-white border border-slate-200 text-[14px] text-slate-900 placeholder:text-slate-400 outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-600/20 transition-colors"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(({ id, label, icon: Icon }) => {
          const active = category === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onCategoryChange(id)}
              className={[
                'inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[12px] font-medium transition-colors border cursor-pointer',
                active
                  ? 'bg-sky-50 text-sky-800 border-sky-200'
                  : 'bg-transparent text-slate-500 border-slate-200 hover:text-slate-900 hover:border-slate-300',
              ].join(' ')}
            >
              <Icon size={13} />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
