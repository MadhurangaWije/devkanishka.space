'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Tag } from '@/components/ui/Tag';
import type { Post } from '@/lib/data/blog';

type BlogCardProps = {
  post: Post;
  index?: number;
  featured?: boolean;
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function BlogCard({ post, index = 0, featured = false }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className={`group block border border-site-border rounded-lg p-6 hover:border-accent/40 transition-all duration-300 hover:bg-surface/50 ${
          featured ? 'md:p-10' : ''
        }`}
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-xs text-text-muted">
            {formatDate(post.date)}
          </span>
          <span className="font-mono text-xs text-text-muted">·</span>
          <span className="font-mono text-xs text-text-muted">
            {post.readingTime} min read
          </span>
          {post.featured && (
            <>
              <span className="font-mono text-xs text-text-muted">·</span>
              <span className="font-mono text-xs text-accent">featured</span>
            </>
          )}
        </div>

        <h3
          className={`font-sans font-black tracking-tight text-text-primary group-hover:text-accent transition-colors mb-3 ${
            featured ? 'text-2xl md:text-3xl' : 'text-xl'
          }`}
        >
          {post.title}
        </h3>

        <p className="font-mono text-sm text-text-secondary leading-relaxed mb-5">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {post.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>

        <span className="font-mono text-sm text-text-muted group-hover:text-accent transition-colors">
          read post →
        </span>
      </Link>
    </motion.article>
  );
}
