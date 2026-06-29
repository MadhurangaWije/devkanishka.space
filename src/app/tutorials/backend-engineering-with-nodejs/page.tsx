import { notFound } from 'next/navigation';
import { PHASE_1_LESSONS } from '@/lib/backend-course';
import { tutorials } from '@/lib/data/tutorials';
import { Tag } from '@/components/ui/Tag';
import Link from 'next/link';

export const metadata = {
  title: 'Backend Engineering with Node.js',
  description: 'A complete learning path from zero to production — structured, progressive, no gaps.',
};

export default function CourseOverviewPage() {
  const tutorial = tutorials.find((t) => t.slug === 'backend-engineering-with-nodejs');
  if (!tutorial) notFound();

  return (
    <div className="px-6 md:px-12 py-12 max-w-3xl">
      {/* Header */}
      <div className="mb-10">
        <p className="font-mono text-xs text-accent uppercase tracking-widest mb-4">
          Phase 1 — Foundations · 7 lessons
        </p>
        <h1 className="font-sans text-3xl md:text-4xl font-black tracking-tighter text-text-primary mb-4">
          {tutorial.title}
        </h1>
        <p className="font-mono text-sm text-text-secondary leading-relaxed mb-6">
          {tutorial.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tutorial.tags.map((tag) => (
            <Tag key={tag} label={tag} variant="accent" />
          ))}
        </div>
      </div>

      <div className="border-t border-site-border mb-10" />

      {/* Phase 1 lessons */}
      <div>
        <p className="font-mono text-xs text-accent uppercase tracking-widest mb-6">
          Phase 1 — Foundations
        </p>
        <div className="space-y-2">
          {PHASE_1_LESSONS.map((lesson) => (
            <Link
              key={lesson.slug}
              href={`/tutorials/backend-engineering-with-nodejs/phase-1/${lesson.slug}`}
              className="flex items-start gap-4 p-4 border border-site-border rounded group hover:border-accent/30 transition-colors"
            >
              <span className="font-mono text-xs text-text-muted w-6 shrink-0 mt-0.5">
                {String(lesson.number).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <p className="font-mono text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                  {lesson.title}
                </p>
                <p className="font-mono text-xs text-text-muted mt-1 leading-relaxed">
                  {lesson.subtitle}
                </p>
              </div>
              <span className="ml-auto text-text-muted group-hover:text-accent transition-colors shrink-0 font-mono text-xs mt-0.5">
                →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href={`/tutorials/backend-engineering-with-nodejs/phase-1/${PHASE_1_LESSONS[0].slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-bg font-mono text-sm font-semibold rounded hover:bg-accent-dim transition-colors"
          >
            Start Phase 1 →
          </Link>
        </div>
      </div>

      {/* Coming soon phases */}
      <div className="mt-12 border-t border-site-border pt-10">
        <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-4">Phases 2–7</p>
        <p className="font-mono text-sm text-text-muted">
          Phases 2 through 7 are in development. Master Phase 1 first —
          the foundations here underpin everything that comes after.
        </p>
      </div>
    </div>
  );
}
