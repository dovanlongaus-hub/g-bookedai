'use client';

import { useState, useRef, useEffect, type ReactNode } from 'react';
import { cn } from '../lib/utils.js';

export interface AccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}

function AccordionPanel({
  item,
  isOpen,
  onToggle,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, item.content]);

  const triggerId = `accordion-trigger-${item.id}`;
  const panelId = `accordion-panel-${item.id}`;

  return (
    <div className="border-b border-white/[0.08] last:border-b-0">
      <button
        type="button"
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        disabled={item.disabled}
        onClick={onToggle}
        className={cn(
          'flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-[var(--text-main)] transition-all duration-200 hover:bg-white/[0.04] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500/50',
          item.disabled && 'opacity-40 cursor-not-allowed'
        )}
      >
        <span className="text-left">{item.title}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={cn('shrink-0 text-[var(--text-muted)] transition-transform duration-200', isOpen && 'rotate-180')}
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        style={{ maxHeight: isOpen ? `${maxHeight}px` : '0px' }}
        className="overflow-hidden transition-[max-height] duration-200 ease-in-out"
      >
        <div ref={contentRef} className="px-4 pb-4 text-sm text-[var(--text-muted)]">
          {item.content}
        </div>
      </div>
    </div>
  );
}

export function Accordion({ items, multiple = false, defaultOpen = [], className }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpen));

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!multiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={cn('rounded-xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl overflow-hidden', className)}>
      {items.map((item) => (
        <AccordionPanel
          key={item.id}
          item={item}
          isOpen={openIds.has(item.id)}
          onToggle={() => !item.disabled && toggle(item.id)}
        />
      ))}
    </div>
  );
}
