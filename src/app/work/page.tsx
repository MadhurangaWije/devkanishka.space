'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/lib/data/projects';
import { ProjectCard } from '@/components/work/ProjectCard';
import { CaseStudyModal } from '@/components/work/CaseStudyModal';
import type { Project } from '@/lib/data/projects';

export default function WorkPage() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <div className="pt-32 pb-24">
      <div className="container-site">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <p className="label text-accent mb-4">selected work</p>
          <h1 className="font-sans text-5xl md:text-6xl font-black tracking-tighter mb-6">
            Things I&apos;ve shipped.
          </h1>
          <p className="font-mono text-base text-text-secondary max-w-xl leading-relaxed">
            A curated set of projects where I had a meaningful engineering role. Each one
            had a real problem, real constraints, and real users depending on it.
          </p>
        </motion.div>

        {/* Projects */}
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

        {/* Availability note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 pt-12 border-t border-site-border"
        >
          <p className="font-mono text-sm text-text-muted text-center">
            Want to work together?{' '}
            <a href="/contact" className="text-accent hover:underline">
              Let&apos;s talk →
            </a>
          </p>
        </motion.div>
      </div>

      <CaseStudyModal project={active} onClose={() => setActive(null)} />
    </div>
  );
}
