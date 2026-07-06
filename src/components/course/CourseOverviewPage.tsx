import Link from 'next/link';
import { Tag } from '@/components/ui/Tag';
import type { Tutorial } from '@/lib/data/tutorials';
import type { PhaseMeta } from '@/lib/backend-course';

const DIFFICULTY_STYLES = {
  beginner: 'text-green-400 border-green-400/30 bg-green-400/5',
  intermediate: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5',
  advanced: 'text-red-400 border-red-400/30 bg-red-400/5',
};

type Props = {
  tutorial: Tutorial;
  phases: PhaseMeta[];
  courseBase: string;
  /** Label for the structural unit — "phase", "module", or "chapter". Defaults to "phase". */
  unitLabel?: string;
  /** Extra note rendered under the course structure list (e.g. "a few gaps remain"). */
  note?: string;
};

export function CourseOverviewPage({ tutorial, phases, courseBase, unitLabel = 'phase', note }: Props) {
  const totalLessons = phases.reduce((s, p) => s + p.lessons.length, 0);
  const firstPhase = phases[0];
  const firstLesson = firstPhase?.lessons[0];

  return (
    <div className="px-6 md:px-12 py-12 max-w-4xl">
      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-3 flex-wrap mb-5">
          <span className={`font-mono text-xs px-2 py-0.5 rounded border ${DIFFICULTY_STYLES[tutorial.difficulty]}`}>
            {tutorial.difficulty}
          </span>
          <span className="font-mono text-sm text-text-muted">
            {totalLessons} lessons · {phases.length} {unitLabel}
            {phases.length === 1 ? '' : 's'}
          </span>
        </div>

        <h1 className="font-sans text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-5">
          {tutorial.title}
        </h1>

        <p className="font-mono text-base text-text-secondary leading-relaxed mb-6 max-w-2xl">
          {tutorial.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {tutorial.tags.map((tag) => (
            <Tag key={tag} label={tag} variant="accent" />
          ))}
        </div>
      </header>

      <div className="border-t border-site-border mb-12" />

      {/* Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
        <div>
          <p className="label text-accent mb-4">prerequisites</p>
          <ul className="space-y-2">
            {tutorial.prerequisites.map((p) => (
              <li key={p} className="flex items-start gap-2 font-mono text-sm text-text-secondary">
                <span className="text-text-muted shrink-0 mt-0.5">→</span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className="label text-accent mb-4">you&apos;ll learn</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            {tutorial.learningOutcomes.map((o) => (
              <li key={o} className="flex items-start gap-2 font-mono text-sm text-text-secondary">
                <span className="text-accent shrink-0 mt-0.5">✓</span>
                {o}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-site-border mb-12" />

      {/* Course structure — phase/chapter names only, full lesson list lives in the sidebar */}
      <div className="mb-12">
        <p className="label text-accent mb-4">course structure</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {phases.map((phase) => {
            const href = `${courseBase}/${phase.urlSegment}/${phase.lessons[0]?.slug}`;
            return (
              <Link
                key={phase.number}
                href={href}
                className="flex items-center justify-between gap-3 p-3.5 border border-site-border rounded group hover:border-accent/30 transition-colors"
              >
                <span className="font-mono text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                  {phase.name}
                </span>
                <span className="font-mono text-xs text-text-muted shrink-0">
                  {phase.lessons.length}
                </span>
              </Link>
            );
          })}
        </div>
        {note && (
          <p className="font-mono text-xs text-text-muted leading-relaxed mt-4">{note}</p>
        )}
      </div>

      {/* Start CTA */}
      {firstLesson && (
        <Link
          href={`${courseBase}/${firstPhase.urlSegment}/${firstLesson.slug}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-bg font-mono text-sm font-semibold rounded hover:bg-accent-dim transition-colors"
        >
          Start from the beginning →
        </Link>
      )}
    </div>
  );
}
