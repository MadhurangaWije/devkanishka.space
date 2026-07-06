'use client';

import Link from 'next/link';
import { useReadingMode } from '@/components/course/ReadingModeContext';

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/kanishka' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Twitter', href: 'https://twitter.com/kanishka' },
];

export function Footer() {
  const { isReadingMode } = useReadingMode();
  if (isReadingMode) return null;

  return (
    <footer className="border-t border-site-border mt-24">
      <div className="container-site py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <Link
              href="/"
              className="font-sans text-lg font-black tracking-tighter text-text-primary hover:text-accent transition-colors"
            >
              K.
            </Link>
            <p className="font-mono text-sm text-text-muted mt-1">
              Backend & DevOps · Building systems that survive reality.
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-text-secondary hover:text-accent transition-colors"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-10 pt-6 border-t border-site-border/50 gap-2">
          <span className="font-mono text-xs text-text-muted">
            © {new Date().getFullYear()} Kanishka. All rights reserved.
          </span>
          <span className="font-mono text-xs text-text-muted">
            Built with Next.js · Tailwind · Framer Motion
          </span>
        </div>
      </div>
    </footer>
  );
}
