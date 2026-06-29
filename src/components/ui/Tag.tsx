type TagProps = {
  label: string;
  variant?: 'default' | 'accent' | 'muted';
};

export function Tag({ label, variant = 'default' }: TagProps) {
  const styles = {
    default: 'border-site-border text-text-secondary bg-transparent',
    accent: 'border-accent/30 text-accent bg-accent/5',
    muted: 'border-site-border/50 text-text-muted bg-transparent',
  };

  return (
    <span
      className={`inline-block font-mono text-xs px-2.5 py-1 rounded border ${styles[variant]}`}
    >
      {label}
    </span>
  );
}
