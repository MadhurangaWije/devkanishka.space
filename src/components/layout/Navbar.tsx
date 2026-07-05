'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { href: '/work', label: 'work' },
  { href: '/blog', label: 'blog' },
  { href: '/tutorials', label: 'guides' },
  { href: '/experiments', label: 'experiments' },
  { href: '/ask', label: 'ask me' },
  { href: '/contact', label: 'contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-bg/95 backdrop-blur-sm border-b border-site-border'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-site flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-sans text-lg font-black tracking-tighter text-text-primary hover:text-accent transition-colors"
          >
            K.
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-mono text-sm transition-colors relative group ${
                    pathname.startsWith(link.href)
                      ? 'text-accent'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.label}
                  {pathname.startsWith(link.href) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-text-secondary hover:text-text-primary transition-colors p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className="font-mono text-sm">{mobileOpen ? '[×]' : '[≡]'}</span>
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-bg/98 flex flex-col pt-20 px-6"
          >
            <ul className="flex flex-col gap-6 mt-8">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={`font-sans text-3xl font-black tracking-tighter ${
                      pathname.startsWith(link.href)
                        ? 'text-accent'
                        : 'text-text-primary'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto mb-12 text-text-muted font-mono text-sm">
              hi@devkanishka.space
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
