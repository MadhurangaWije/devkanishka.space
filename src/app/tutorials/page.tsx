import { Metadata } from 'next';
import { tutorials, CATEGORIES } from '@/lib/data/tutorials';
import { TutorialCard } from '@/components/tutorials/TutorialCard';

export const metadata: Metadata = {
  title: 'Tutorials',
  description: 'Practical, in-depth tutorials for engineers who want to build real things — cloud & infrastructure, AI & machine learning, and programming & backend.',
};

export default function TutorialsPage() {
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
            direction, not a shortcut around the effort. Go at whatever pace works for you —
            there&apos;s no clock running here.
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
            { value: CATEGORIES.length.toString(), label: 'categories' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-sans text-2xl font-black">{stat.value}</div>
              <div className="label text-text-muted mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tutorials grouped by category */}
        {CATEGORIES.map((category, ci) => {
          const inCategory = tutorials.filter((t) => t.category === category);
          if (inCategory.length === 0) return null;
          return (
            <div key={category} className={ci > 0 ? 'mt-16' : ''}>
              <div className="flex items-center gap-4 mb-6">
                <p className="label whitespace-nowrap">{category}</p>
                <div className="flex-1 h-px bg-site-border" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {inCategory.map((t, i) => (
                  <TutorialCard key={t.slug} tutorial={t} index={i} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
