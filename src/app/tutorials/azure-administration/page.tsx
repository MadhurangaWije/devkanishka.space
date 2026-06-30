import { Metadata } from 'next';
import Link from 'next/link';
import { AZURE_PHASES } from '@/lib/azure-course';

export const metadata: Metadata = {
  title: 'Azure Administration (AZ-104) — Full Course',
  description:
    'A complete, practitioner-oriented guide to Azure Administration — 25 lessons across 6 modules covering every AZ-104 exam domain: identity, storage, compute, networking, monitoring, and enterprise governance.',
};

const COURSE_BASE = '/tutorials/azure-administration';

export default function AzureCoursePage() {
  const totalLessons = AZURE_PHASES.reduce((sum, p) => sum + p.lessons.length, 0);

  return (
    <div className="pt-12 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 flex-wrap mb-5">
            <span className="font-mono text-xs px-2 py-0.5 rounded border text-yellow-400 border-yellow-400/30 bg-yellow-400/5">
              intermediate
            </span>
            <span className="font-mono text-sm text-text-muted">6 modules</span>
            <span className="font-mono text-sm text-text-muted">·</span>
            <span className="font-mono text-sm text-text-muted">{totalLessons} lessons</span>
            <span className="font-mono text-sm text-text-muted">·</span>
            <span className="font-mono text-sm text-text-muted">~12h total</span>
          </div>

          <h1 className="font-sans text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-5">
            Azure Administration
          </h1>

          <p className="font-mono text-base text-text-secondary leading-relaxed mb-3">
            A complete, practitioner-oriented guide through every AZ-104 exam domain. Each lesson
            is built around the decisions you will face as an Azure administrator — not just the
            commands, but the reasoning behind them.
          </p>
          <p className="font-mono text-sm text-text-muted leading-relaxed">
            Covers identity & governance, storage, compute, networking, monitoring, and
            enterprise-scale architecture. No fluff, no filler — only what you actually need
            to manage and secure Azure at scale.
          </p>
        </header>

        <div className="border-t border-site-border mb-10" />

        {/* Modules */}
        <section className="space-y-10">
          <p className="label text-accent">course modules</p>

          {AZURE_PHASES.map((phase) => (
            <div key={phase.number}>
              <h2 className="font-sans text-lg font-bold tracking-tight text-text-primary mb-3">
                {phase.name}
              </h2>
              <div className="space-y-1.5">
                {phase.lessons.map((lesson) => (
                  <Link
                    key={lesson.slug}
                    href={`${COURSE_BASE}/${phase.urlSegment}/${lesson.slug}`}
                    className="flex items-start gap-4 p-3.5 border border-site-border rounded group hover:border-accent/30 transition-colors"
                  >
                    <span className="font-mono text-xs text-text-muted shrink-0 w-6 mt-0.5">
                      {String(lesson.number).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                        {lesson.title}
                      </p>
                      <p className="font-mono text-xs text-text-muted mt-0.5 leading-relaxed">
                        {lesson.subtitle}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-text-muted shrink-0 mt-0.5 group-hover:text-accent transition-colors">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* CTA */}
        <div className="mt-12 border-t border-site-border pt-10">
          <Link
            href={`${COURSE_BASE}/module-1/azure-resource-hierarchy`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-bg font-mono text-sm font-bold rounded hover:opacity-90 transition-opacity"
          >
            start module 1 →
          </Link>
        </div>
      </div>
    </div>
  );
}
