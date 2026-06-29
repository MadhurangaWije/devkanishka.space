import { Hero } from '@/components/home/Hero';
import { SelectedWork } from '@/components/home/SelectedWork';
import { TechConstellation } from '@/components/home/TechConstellation';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <TechConstellation />

      {/* Contact teaser */}
      <section className="section-pad border-t border-site-border">
        <div className="container-site text-center max-w-2xl mx-auto">
          <p className="label text-accent mb-4">available for work</p>
          <h2 className="font-sans text-4xl md:text-5xl font-black tracking-tighter mb-6">
            Let&apos;s build something that lasts.
          </h2>
          <p className="font-mono text-sm text-text-secondary leading-relaxed mb-10">
            I&apos;m open to senior backend/DevOps roles at product-focused startups, and
            select freelance engagements for systems that need to be fast, reliable, and
            maintainable long after I&apos;m gone.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="/contact" variant="terminal">
              ./start-a-conversation
            </Button>
            <Button href="mailto:hi@devkanishka.space" variant="ghost" external>
              hi@devkanishka.space
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
