'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import type { PhaseMeta } from '@/lib/backend-course';

const DEFAULT_COMING_SOON = [
  'Phase 3 — Data & Persistence',
  'Phase 4 — Authentication & Security',
  'Phase 5 — Production Readiness',
  'Phase 6 — Infrastructure & Deployment',
  'Phase 7 — Advanced Topics',
];

type Props = {
  phases: PhaseMeta[];
  comingSoonPhases?: string[];
  courseBase: string;
  courseTitle: string;
  totalPhaseCount?: number;
};

export function CourseSidebar({
  phases,
  comingSoonPhases = DEFAULT_COMING_SOON,
  courseBase,
  courseTitle,
  totalPhaseCount,
}: Props) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const totalLessons = phases.reduce((sum, p) => sum + p.lessons.length, 0);
  const totalPhases = phases.length;
  const denominator = totalPhaseCount ?? totalPhases + comingSoonPhases.length;

  const SidebarContent = () => (
    <div className="flex flex-col h-full py-6 px-4 overflow-y-auto">
      {/* Back link */}
      <Link
        href="/tutorials"
        onClick={() => setMobileOpen(false)}
        className="flex items-center gap-2 font-mono text-xs text-text-secondary hover:text-accent transition-colors mb-8 group"
      >
        <span className="text-text-muted group-hover:text-accent transition-colors">←</span>
        all guides
      </Link>

      {/* Course title */}
      <div className="mb-8">
        <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-2">Course</p>
        <Link
          href={courseBase}
          onClick={() => setMobileOpen(false)}
          className="font-sans text-sm font-black tracking-tight text-text-primary hover:text-accent transition-colors leading-tight block"
        >
          {courseTitle}
        </Link>
      </div>

      {/* Active phases with lessons */}
      <div className="space-y-6 mb-6">
        {phases.map((phase) => {
          const phaseBase = `${courseBase}/${phase.urlSegment}`;
          return (
            <div key={phase.number}>
              <p className="font-mono text-xs text-accent uppercase tracking-widest mb-2 px-2">
                {phase.name}
              </p>
              <ul className="space-y-0.5">
                {phase.lessons.map((lesson) => {
                  const href = `${phaseBase}/${lesson.slug}`;
                  const active = pathname === href;
                  return (
                    <li key={lesson.slug}>
                      <Link
                        href={href}
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
          );
        })}
      </div>

      {/* Coming-soon phases */}
      {comingSoonPhases.length > 0 && (
        <div className="space-y-2 border-t border-site-border pt-4">
          {comingSoonPhases.map((phase) => (
            <div key={phase} className="px-2 py-1.5 opacity-30 cursor-default">
              <p className="font-mono text-xs text-text-muted flex items-center gap-2">
                <span className="shrink-0">·</span>
                <span className="truncate">{phase}</span>
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Progress footer */}
      <div className="mt-auto pt-6 border-t border-site-border">
        <p className="font-mono text-xs text-text-muted">
          {totalPhases} of {denominator} phases · {totalLessons} lessons
        </p>
        <div className="mt-2 h-1 rounded-full bg-surface-elevated overflow-hidden">
          <div
            className="h-full rounded-full bg-accent"
            style={{ width: `${(totalPhases / denominator) * 100}%` }}
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

      {/* Mobile toggle */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 px-4 py-2.5 bg-surface border border-site-border rounded-full font-mono text-xs text-text-secondary hover:text-accent hover:border-accent/30 transition-colors shadow-lg"
        >
          {mobileOpen ? '× close' : '≡ lessons'}
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
