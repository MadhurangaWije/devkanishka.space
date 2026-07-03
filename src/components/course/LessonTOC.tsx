'use client';

import { useEffect, useRef, useState } from 'react';
import type { LessonHeading } from '@/lib/lesson-toc';

type Props = {
  headings: LessonHeading[];
};

export function LessonTOC({ headings }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => !!el);
    if (elements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 }
    );

    elements.forEach((el) => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="On this page"
      className="hidden xl:block w-52 shrink-0 sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto"
    >
      <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-3">
        On this page
      </p>
      <ul className="space-y-0.5 border-l border-site-border">
        {headings.map((h) => {
          const active = activeId === h.id;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`block pl-3 -ml-px border-l-2 py-1 font-mono text-xs leading-snug transition-colors ${
                  active
                    ? 'border-accent text-accent'
                    : 'border-transparent text-text-muted hover:text-text-secondary'
                }`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
