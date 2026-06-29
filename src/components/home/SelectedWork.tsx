'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/lib/data/projects';
import { ProjectCard } from '@/components/work/ProjectCard';
import { CaseStudyModal } from '@/components/work/CaseStudyModal';
import { Button } from '@/components/ui/Button';
import type { Project } from '@/lib/data/projects';

export function SelectedWork() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section className="section-pad border-t border-site-border">
      <div className="container-site">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="label text-accent mb-3">selected work</p>
            <h2 className="font-sans text-4xl md:text-5xl font-black tracking-tighter">
              Things I&apos;ve shipped.
            </h2>
          </div>
          <p className="font-mono text-sm text-text-secondary max-w-sm">
            A few projects worth talking about. Each one solved a real problem with real constraints.
          </p>
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => setActive(project)}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 flex justify-center"
        >
          <Button href="/work" variant="ghost">
            view all work →
          </Button>
        </motion.div>
      </div>

      <CaseStudyModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
