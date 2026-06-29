'use client';

import { motion } from 'framer-motion';
import { Terminal } from './Terminal';
import { Button } from '@/components/ui/Button';

const FADE_UP = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-16">
      <div className="container-site w-full py-20 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — headline */}
          <div>
            <motion.p
              {...FADE_UP}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="label text-accent mb-6"
            >
              Available for hire
            </motion.p>

            <motion.h1
              {...FADE_UP}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-sans text-5xl md:text-6xl xl:text-7xl font-black tracking-tighter text-text-primary leading-none mb-6"
            >
              I build the systems{' '}
              <span className="text-accent">your products</span>{' '}
              depend on.
            </motion.h1>

            <motion.p
              {...FADE_UP}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-mono text-base text-text-secondary leading-relaxed max-w-lg mb-10"
            >
              Backend architecture and DevOps engineering for startups/enterprises that can&apos;t
              afford to be slow, brittle, or down. 6+ years building systems that
              survive production.
            </motion.p>

            <motion.div
              {...FADE_UP}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button href="/work" variant="terminal">
                ./view-my-work
              </Button>
              <Button href="/contact" variant="ghost">
                get in touch
              </Button>
            </motion.div>

            <motion.div
              {...FADE_UP}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-6 mt-12 pt-12 border-t border-site-border"
            >
              {[
                { value: '6+', label: 'years in production' },
                { value: '1M+', label: 'jobs/day in prod' },
                { value: '50K', label: 'events/sec handled' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-sans text-2xl font-black text-text-primary">
                    {stat.value}
                  </div>
                  <div className="font-mono text-xs text-text-muted mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — terminal */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="label mb-3"
            >
              → try it — type help
            </motion.div>
            <Terminal />
          </div>
        </div>
      </div>
    </section>
  );
}
