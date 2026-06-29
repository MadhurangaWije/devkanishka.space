'use client';

import { motion } from 'framer-motion';
import { Tag } from '@/components/ui/Tag';
import type { Project } from '@/lib/data/projects';

type ProjectCardProps = {
  project: Project;
  index: number;
  onClick: () => void;
};

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      className="group cursor-pointer border border-site-border rounded-lg p-6 md:p-8 hover:border-accent/40 transition-all duration-300 hover:bg-surface/50"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="label text-text-muted mb-1">{project.year}</p>
          <h3 className="font-sans text-xl font-black tracking-tight text-text-primary group-hover:text-accent transition-colors">
            {project.title}
          </h3>
        </div>
        <span
          className={`font-mono text-xs px-2 py-1 rounded border shrink-0 ${
            project.status === 'live'
              ? 'border-accent/30 text-accent bg-accent/5'
              : 'border-site-border text-text-muted'
          }`}
        >
          {project.status}
        </span>
      </div>

      <p className="font-mono text-sm text-text-secondary leading-relaxed mb-6">
        {project.tagline}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center gap-1 font-mono text-sm text-text-muted group-hover:text-accent transition-colors">
        <span>read case study</span>
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </div>
    </motion.article>
  );
}
