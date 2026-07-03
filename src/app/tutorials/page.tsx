import { Metadata } from 'next';
import { tutorials } from '@/lib/data/tutorials';
import { TutorialCard } from '@/components/tutorials/TutorialCard';

export const metadata: Metadata = {
  title: 'Tutorials',
  description: 'Practical, in-depth tutorials for engineers who want to build real things — distributed systems, Go, Kubernetes, and more.',
};

const DIFFICULTIES = ['all', 'beginner', 'intermediate', 'advanced'] as const;

export default function TutorialsPage() {
  const featured = tutorials.filter((t) => t.featured);
  const rest = tutorials.filter((t) => !t.featured);

  return (
    <div className="pt-32 pb-24">
      <div className="container-site">
        {/* Header */}
        <div className="mb-20">
          <p className="label text-accent mb-4">for the ❤️ of teaching</p>
          <h1 className="font-sans text-5xl md:text-6xl font-black tracking-tighter mb-6">
            Learn it the way I did.
          </h1>
          <p className="font-mono text-base text-text-secondary max-w-xl leading-relaxed">
            These come out of my own self-learning — inspired by the real struggles I ran into along the way. I&apos;m publishing them here hoping they make
            someone else&apos;s journey a little smoother. But reading these isn&apos;t the
            work — you still have to sit with the hard parts, think them through on your
            own, and get your hands dirty applying it. Consider this a push in the right
            direction, not a shortcut around the effort.
          </p>
        </div>

        {/* Stats bar */}
        <div className="flex items-center gap-8 mb-16 pb-8 border-b border-site-border">
          {[
            { value: tutorials.length.toString(), label: 'tutorials' },
            {
              value: `${tutorials.reduce((acc, t) => acc + t.parts, 0)}`,
              label: 'total parts',
            },
            {
              value: `${tutorials.reduce((acc, t) => acc + t.estimatedHours, 0)}h`,
              label: 'content',
            },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-sans text-2xl font-black">{stat.value}</div>
              <div className="label text-text-muted mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Featured */}
        {featured.length > 0 && (
          <>
            <p className="label mb-6">featured series</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
              {featured.map((t, i) => (
                <TutorialCard key={t.slug} tutorial={t} index={i} />
              ))}
            </div>

            <div className="flex items-center gap-4 my-10">
              <div className="flex-1 h-px bg-site-border" />
              <span className="label">all tutorials</span>
              <div className="flex-1 h-px bg-site-border" />
            </div>
          </>
        )}

        {/* All tutorials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((t, i) => (
            <TutorialCard key={t.slug} tutorial={t} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
