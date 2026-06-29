import { notFound } from 'next/navigation';
import { PHASES } from '@/lib/backend-course';
import { tutorials } from '@/lib/data/tutorials';
import { Tag } from '@/components/ui/Tag';
import Link from 'next/link';

export const metadata = {
  title: 'Backend Engineering with Node.js',
  description: 'A complete learning path from zero to production — structured, progressive, no gaps.',
};

const COURSE_BASE = '/tutorials/backend-engineering-with-nodejs';

export default function CourseOverviewPage() {
  const tutorial = tutorials.find((t) => t.slug === 'backend-engineering-with-nodejs');
  if (!tutorial) notFound();

  return (
    <div className="px-6 md:px-12 py-12 max-w-3xl">
      {/* Header */}
      <div className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="font-mono text-xs text-accent border border-accent/30 rounded px-2 py-0.5">
            beginner
          </span>
          <span className="font-mono text-xs text-text-muted">
            {PHASES.reduce((s, p) => s + p.lessons.length, 0)} lessons available · 7 phases total
          </span>
        </div>
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

      {/* Active phases */}
      <div className="space-y-10">
        {PHASES.map((phase) => (
          <div key={phase.number}>
            <p className="font-mono text-xs text-accent uppercase tracking-widest mb-4">
              {phase.name}
            </p>
            <div className="space-y-2">
              {phase.lessons.map((lesson) => (
                <Link
                  key={lesson.slug}
                  href={`${COURSE_BASE}/${phase.urlSegment}/${lesson.slug}`}
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
          </div>
        ))}
      </div>

      {/* Start CTA */}
      <div className="mt-10">
        <Link
          href={`${COURSE_BASE}/${PHASES[0].urlSegment}/${PHASES[0].lessons[0].slug}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-bg font-mono text-sm font-semibold rounded hover:bg-accent-dim transition-colors"
        >
          Start from the beginning →
        </Link>
      </div>

      {/* Coming soon */}
      <div className="mt-12 border-t border-site-border pt-10">
        <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-3">Phases 3–7</p>
        <p className="font-mono text-sm text-text-muted leading-relaxed">
          Data &amp; Persistence, Auth &amp; Security, Production Readiness, Infrastructure, and Advanced Topics
          are being written. Master the available phases first — each one builds directly on the last.
        </p>
      </div>
    </div>
  );
}
