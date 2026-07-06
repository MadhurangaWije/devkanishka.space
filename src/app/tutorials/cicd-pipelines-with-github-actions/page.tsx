import { notFound } from 'next/navigation';
import { CICD_PHASES } from '@/lib/cicd-course';
import { tutorials } from '@/lib/data/tutorials';
import { Tag } from '@/components/ui/Tag';
import Link from 'next/link';

export const metadata = {
  title: 'CI/CD Pipelines with GitHub Actions',
  description: 'A complete path through CI/CD — from your first GitHub Actions workflow through Azure deployments, GitOps with ArgoCD, supply-chain hardening, and operating pipelines at scale.',
};

const COURSE_BASE = '/tutorials/cicd-pipelines-with-github-actions';

export default function CicdCourseOverviewPage() {
  const tutorial = tutorials.find((t) => t.slug === 'cicd-pipelines-with-github-actions');
  if (!tutorial) notFound();

  const totalLessons = CICD_PHASES.reduce((s, p) => s + p.lessons.length, 0);

  return (
    <div className="px-6 md:px-12 py-12 max-w-3xl">
      {/* Header */}
      <div className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="font-mono text-xs text-accent border border-accent/30 rounded px-2 py-0.5">
            {tutorial.difficulty}
          </span>
          <span className="font-mono text-xs text-text-muted">
            {totalLessons} lessons · {CICD_PHASES.length} phases
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
        {CICD_PHASES.map((phase) => (
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
          href={`${COURSE_BASE}/${CICD_PHASES[0].urlSegment}/${CICD_PHASES[0].lessons[0].slug}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-bg font-mono text-sm font-semibold rounded hover:bg-accent-dim transition-colors"
        >
          Start from the beginning →
        </Link>
      </div>
    </div>
  );
}
