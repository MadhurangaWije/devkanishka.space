'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import type { LessonMeta } from '@/lib/backend-course';

const COURSE_BASE = '/tutorials/backend-engineering-with-nodejs';
const PHASE_1_BASE = `${COURSE_BASE}/phase-1`;

const FUTURE_PHASES = [
  'Phase 2 — Building REST APIs',
  'Phase 3 — Data & Persistence',
  'Phase 4 — Authentication & Security',
  'Phase 5 — Production Readiness',
  'Phase 6 — Infrastructure & Deployment',
  'Phase 7 — Advanced Topics',
];

type Props = {
  lessons: LessonMeta[];
};

export function CourseSidebar({ lessons }: Props) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (slug: string) => pathname === `${PHASE_1_BASE}/${slug}`;

  const SidebarContent = () => (
    <div className="flex flex-col h-full py-6 px-4 overflow-y-auto">
      {/* Back link */}
      <Link
        href="/tutorials"
        onClick={() => setMobileOpen(false)}
        className="flex items-center gap-2 font-mono text-xs text-text-secondary hover:text-accent transition-colors mb-8 group"
      >
        <span className="text-text-muted group-hover:text-accent transition-colors">←</span>
        all tutorials
      </Link>

      {/* Course title */}
      <div className="mb-8">
        <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-2">Course</p>
        <Link
          href={COURSE_BASE}
          onClick={() => setMobileOpen(false)}
          className="font-sans text-sm font-black tracking-tight text-text-primary hover:text-accent transition-colors leading-tight block"
        >
          Backend Engineering with Node.js
        </Link>
      </div>

      {/* Phase 1 */}
      <div className="mb-6">
        <p className="font-mono text-xs text-accent uppercase tracking-widest mb-3 px-2">
          Phase 1 — Foundations
        </p>
        <ul className="space-y-0.5">
          {lessons.map((lesson) => {
            const active = isActive(lesson.slug);
            return (
              <li key={lesson.slug}>
                <Link
                  href={`${PHASE_1_BASE}/${lesson.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-2 py-2 rounded text-sm transition-colors group ${
                    active
                      ? 'bg-accent/10 text-accent'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                  }`}
                >
                  <span
                    className={`font-mono text-xs shrink-0 w-5 ${
                      active ? 'text-accent' : 'text-text-muted group-hover:text-text-secondary'
                    }`}
                  >
                    {String(lesson.number).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-xs leading-tight">{lesson.title}</span>
                  {active && (
                    <span className="ml-auto shrink-0 w-1 h-1 rounded-full bg-accent" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Future phases */}
      <div className="space-y-2">
        {FUTURE_PHASES.map((phase) => (
          <div key={phase} className="px-2 py-2 opacity-30 cursor-default">
            <p className="font-mono text-xs text-text-muted uppercase tracking-widest flex items-center gap-2">
              <span className="shrink-0">→</span>
              <span className="truncate">{phase}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-6 border-t border-site-border">
        <p className="font-mono text-xs text-text-muted">Phase 1 of 7</p>
        <div className="mt-2 h-1 rounded-full bg-surface-elevated overflow-hidden">
          <div
            className="h-full rounded-full bg-accent"
            style={{ width: `${(1 / 7) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-72 shrink-0 border-r border-site-border sticky top-16 h-[calc(100vh-64px)] overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Mobile: toggle button + drawer */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 px-4 py-2.5 bg-surface border border-site-border rounded-full font-mono text-xs text-text-secondary hover:text-accent hover:border-accent/30 transition-colors shadow-lg"
        >
          <span>{mobileOpen ? '× close' : '≡ lessons'}</span>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="lg:hidden fixed inset-y-0 right-0 z-30 w-72 bg-bg border-l border-site-border shadow-2xl overflow-y-auto"
          >
            <SidebarContent />
          </motion.div>
        )}
      </AnimatePresence>

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-20 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
