import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { tutorials } from '@/lib/data/tutorials';
import { Tag } from '@/components/ui/Tag';

type Props = {
  params: Promise<{ slug: string }>;
};

// These slugs have their own static folder routes and must be excluded
const STATIC_COURSE_SLUGS = ['backend-engineering-with-nodejs', 'ml-and-dl-mastery', 'azure-administration', 'python-from-a-to-z', 'system-design-beyond-the-prompt'];

export async function generateStaticParams() {
  return tutorials
    .filter((t) => !STATIC_COURSE_SLUGS.includes(t.slug))
    .map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = tutorials.find((t) => t.slug === slug);
  if (!tutorial) return {};
  return {
    title: tutorial.title,
    description: tutorial.description,
  };
}

const DIFFICULTY_STYLES = {
  beginner: 'text-green-400 border-green-400/30 bg-green-400/5',
  intermediate: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5',
  advanced: 'text-red-400 border-red-400/30 bg-red-400/5',
};

export default async function TutorialDetailPage({ params }: Props) {
  const { slug } = await params;
  const tutorial = tutorials.find((t) => t.slug === slug);
  if (!tutorial) notFound();

  return (
    <div className="pt-32 pb-24">
      <div className="container-site max-w-4xl">
        {/* Back */}
        <Link
          href="/tutorials"
          className="inline-flex items-center gap-2 font-mono text-sm text-text-secondary hover:text-accent transition-colors mb-12"
        >
          ← back to tutorials
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 flex-wrap mb-6">
            <span
              className={`font-mono text-xs px-2 py-0.5 rounded border ${
                DIFFICULTY_STYLES[tutorial.difficulty]
              }`}
            >
              {tutorial.difficulty}
            </span>
            <span className="font-mono text-sm text-text-muted">
              {tutorial.parts} parts
            </span>
            <span className="font-mono text-sm text-text-muted">·</span>
            <span className="font-mono text-sm text-text-muted">
              ~{tutorial.estimatedHours}h total
            </span>
          </div>

          <h1 className="font-sans text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-6">
            {tutorial.title}
          </h1>

          <p className="font-mono text-base text-text-secondary leading-relaxed mb-6">
            {tutorial.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {tutorial.tags.map((tag) => (
              <Tag key={tag} label={tag} variant="accent" />
            ))}
          </div>
        </header>

        <div className="border-t border-site-border mb-12" />

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Prerequisites */}
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

            {/* Learning outcomes */}
            <div>
              <p className="label text-accent mb-4">you&apos;ll learn</p>
              <ul className="space-y-3">
                {tutorial.learningOutcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2 font-mono text-sm text-text-secondary">
                    <span className="text-accent shrink-0 mt-0.5">✓</span>
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Parts list */}
          <div className="lg:col-span-2">
            <p className="label text-accent mb-6">course outline</p>
            <div className="space-y-2">
              {tutorial.parts_list.map((part, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 border border-site-border rounded group hover:border-accent/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-text-muted w-6 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                      {part.title}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-text-muted shrink-0 ml-4">
                    {part.duration >= 60
                      ? `${Math.floor(part.duration / 60)}h${part.duration % 60 ? ` ${part.duration % 60}m` : ''}`
                      : `${part.duration}m`}
                  </span>
                </div>
              ))}
            </div>

            {/* Coming soon notice */}
            <div className="mt-8 p-5 border border-site-border/50 rounded bg-surface/50">
              <p className="font-mono text-sm text-text-muted">
                <span className="text-accent">→</span> Content for this tutorial is being written.{' '}
                <a href="/contact" className="text-text-secondary hover:text-accent transition-colors underline underline-offset-2">
                  Get notified when it publishes
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
