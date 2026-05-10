'use client';

import { useState, useRef, useEffect, useCallback, type HTMLAttributes, type ReactNode, type KeyboardEvent } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils.js';

const tabListVariants = cva('relative flex', {
  variants: {
    variant: {
      underline: 'border-b border-white/[0.08] gap-0',
      pills: 'gap-1 p-1 rounded-lg bg-white/[0.04]',
      boxed: 'gap-0 rounded-lg border border-white/[0.08] overflow-hidden',
    },
  },
  defaultVariants: { variant: 'underline' },
});

const tabTriggerVariants = cva(
  'relative inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 cursor-pointer whitespace-nowrap',
  {
    variants: {
      variant: {
        underline: 'text-[var(--text-muted)] hover:text-[var(--text-main)] border-b-2 border-transparent -mb-px data-[active=true]:text-[var(--primary)] data-[active=true]:border-[var(--primary)]',
        pills: 'text-[var(--text-muted)] hover:text-[var(--text-main)] rounded-md data-[active=true]:bg-[var(--primary)] data-[active=true]:text-white data-[active=true]:shadow-sm',
        boxed: 'text-[var(--text-muted)] hover:text-[var(--text-main)] flex-1 data-[active=true]:bg-white/10 data-[active=true]:text-[var(--text-main)] border-r border-white/[0.08] last:border-r-0',
      },
    },
    defaultVariants: { variant: 'underline' },
  }
);

export interface TabItem {
  value: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>, VariantProps<typeof tabListVariants> {
  tabs: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export function Tabs({ className, tabs, value: controlledValue, defaultValue, onChange, variant, ...props }: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || tabs[0]?.value || '');
  const activeValue = controlledValue ?? internalValue;
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const setActive = useCallback(
    (val: string) => {
      if (controlledValue === undefined) setInternalValue(val);
      onChange?.(val);
    },
    [controlledValue, onChange]
  );

  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    const enabledIndexes = tabs.map((t, i) => (t.disabled ? -1 : i)).filter((i) => i >= 0);
    const currentPos = enabledIndexes.indexOf(index);
    let nextIndex = -1;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = enabledIndexes[(currentPos + 1) % enabledIndexes.length];
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = enabledIndexes[(currentPos - 1 + enabledIndexes.length) % enabledIndexes.length];
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = enabledIndexes[0];
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = enabledIndexes[enabledIndexes.length - 1];
    }

    if (nextIndex >= 0) {
      tabRefs.current[nextIndex]?.focus();
      setActive(tabs[nextIndex].value);
    }
  };

  const activeTab = tabs.find((t) => t.value === activeValue);
  const activeId = `tab-${activeValue}`;
  const panelId = `tabpanel-${activeValue}`;

  return (
    <div className={cn('w-full', className)} {...props}>
      <div role="tablist" aria-orientation="horizontal" className={tabListVariants({ variant })}>
        {tabs.map((tab, i) => (
          <button
            key={tab.value}
            ref={(el) => { tabRefs.current[i] = el; }}
            role="tab"
            type="button"
            id={`tab-${tab.value}`}
            aria-selected={tab.value === activeValue}
            aria-controls={`tabpanel-${tab.value}`}
            aria-disabled={tab.disabled}
            data-active={tab.value === activeValue}
            tabIndex={tab.value === activeValue ? 0 : -1}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && setActive(tab.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={cn(
              tabTriggerVariants({ variant }),
              tab.disabled && 'opacity-40 cursor-not-allowed'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={panelId}
        aria-labelledby={activeId}
        tabIndex={0}
        className="mt-4 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 rounded-md"
      >
        {activeTab?.content}
      </div>
    </div>
  );
}
