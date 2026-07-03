import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experiments',
  description: 'Quick, unpolished experiments with new tools, weird hardware, and half-baked ideas.',
};

export default function ExperimentsPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container-site">
        {/* Header */}
        <div className="mb-20">
          <p className="label text-accent mb-4">experiments</p>
          <h1 className="font-sans text-5xl md:text-6xl font-black tracking-tighter mb-6">
            Just trying stuff.
          </h1>
          <p className="font-mono text-base text-text-secondary max-w-xl leading-relaxed">
            Quick, unpolished write-ups — not tutorials, not guided lessons. Sometimes
            it&apos;s a newer piece of tech I wanted to poke at, sometimes it&apos;s
            something like wiring together a homemade distributed computing cluster out
            of whatever cheap hardware I had lying around. This is where I share what I
            tried and what actually happened.
          </p>
        </div>

        {/* Coming soon */}
        <div className="border border-site-border rounded-lg p-10 md:p-16 text-center">
          <p className="label text-accent mb-4">coming soon</p>
          <h2 className="font-sans text-2xl md:text-3xl font-black tracking-tight mb-6">
            The first experiment is still in progress.
          </h2>
          <p className="font-mono text-sm text-text-secondary leading-relaxed max-w-lg mx-auto">
            This is where I&apos;ll post short write-ups of things I tried just to see
            what would happen — new tools, odd hardware setups, ideas that may or may not
            have worked out. Less a tutorial, more a lab notebook: what I tried, what
            broke, and what I learned from it.
          </p>
        </div>
      </div>
    </div>
  );
}
