'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag } from '@/components/ui/Tag';
import type { Project } from '@/lib/data/projects';

type CaseStudyModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-bg/90 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 z-50 w-full md:w-[700px] max-h-[90vh] overflow-y-auto bg-surface border border-site-border rounded-t-2xl md:rounded-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 bg-surface border-b border-site-border px-6 py-4 flex items-center justify-between">
              <div>
                <p className="label text-text-muted">{project.year} · {project.status}</p>
                <h2 className="font-sans text-2xl font-black tracking-tight mt-0.5">
                  {project.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="font-mono text-xl text-text-muted hover:text-text-primary transition-colors p-1"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-8 space-y-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Tag key={tag} label={tag} variant="accent" />
                ))}
              </div>

              {/* Tagline */}
              <p className="font-mono text-base text-text-secondary leading-relaxed">
                {project.tagline}
              </p>

              {/* Sections */}
              {[
                { label: 'The Challenge', text: project.challenge },
                { label: 'The Solution', text: project.solution },
                { label: 'The Outcome', text: project.outcome },
              ].map((section) => (
                <div key={section.label}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="accent-line" />
                    <p className="label text-accent">{section.label}</p>
                  </div>
                  <p className="font-mono text-sm text-text-secondary leading-relaxed pl-11">
                    {section.text}
                  </p>
                </div>
              ))}

              {/* Links */}
              {(project.links.github || project.links.live) && (
                <div className="flex gap-4 pt-2">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-text-secondary hover:text-accent transition-colors"
                    >
                      GitHub ↗
                    </a>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-text-secondary hover:text-accent transition-colors"
                    >
                      Live site ↗
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
