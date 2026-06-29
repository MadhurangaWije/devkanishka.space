import Link from 'next/link';
import { ReactNode } from 'react';

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost' | 'terminal';
  children: ReactNode;
  external?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

export function Button({
  href,
  onClick,
  variant = 'primary',
  children,
  external,
  type = 'button',
  disabled,
}: ButtonProps) {
  const base = 'inline-flex items-center gap-2 font-mono text-sm transition-all duration-200 rounded focus-visible:ring-1 focus-visible:ring-accent';

  const variants = {
    primary:
      'px-5 py-2.5 bg-accent text-bg font-medium hover:bg-accent/90 active:scale-[0.98]',
    ghost:
      'px-5 py-2.5 border border-site-border text-text-secondary hover:border-text-secondary hover:text-text-primary',
    terminal:
      'px-4 py-2 border border-accent/40 text-accent hover:bg-accent/10 before:content-["$_"] before:text-text-muted',
  };

  const cls = `${base} ${variants[variant]} ${disabled ? 'opacity-40 pointer-events-none' : ''}`;

  if (href) {
    const isExternal = external || href.startsWith('http');
    return (
      <Link
        href={href}
        className={cls}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
