'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Tag } from '@/components/ui/Tag';
import type { Tutorial } from '@/lib/data/tutorials';

type TutorialCardProps = {
  tutorial: Tutorial;
  index?: number;
};

const DIFFICULTY_STYLES = {
  beginner: 'text-green-400 border-green-400/30 bg-green-400/5',
  intermediate: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5',
  advanced: 'text-red-400 border-red-400/30 bg-red-400/5',
};

export function TutorialCard({ tutorial, index = 0 }: TutorialCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        href={`/tutorials/${tutorial.slug}`}
        className="group block border border-site-border rounded-lg p-6 hover:border-accent/40 transition-all duration-300 hover:bg-surface/50 h-full"
      >
        {/* Metadata row */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span
            className={`font-mono text-xs px-2 py-0.5 rounded border ${
              DIFFICULTY_STYLES[tutorial.difficulty]
            }`}
          >
            {tutorial.difficulty}
          </span>
          <span className="font-mono text-xs text-text-muted">
            {tutorial.parts} parts
          </span>
        </div>

        <h3 className="font-sans text-xl font-black tracking-tight text-text-primary group-hover:text-accent transition-colors mb-3">
          {tutorial.title}
        </h3>

        <p className="font-mono text-sm text-text-secondary leading-relaxed mb-5">
          {tutorial.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {tutorial.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>

        <span className="font-mono text-sm text-text-muted group-hover:text-accent transition-colors">
          start tutorial →
        </span>
      </Link>
    </motion.article>
  );
}
