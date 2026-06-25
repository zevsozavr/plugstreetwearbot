import type { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'glass' | 'ghost';
  fullWidth?: boolean;
  glow?: boolean;
}

export function Button({ variant = 'primary', fullWidth, glow, style, children, ...props }: Props) {
  const base: React.CSSProperties = {
    font: 'var(--font-label-lg)',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    padding: '14px 24px',
    borderRadius: 12,
    transition: 'all 0.2s',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: 'var(--primary)',
      color: 'var(--on-primary)',
      ...(glow ? { boxShadow: '0 0 30px rgba(125,211,252,0.05)' } : {}),
    },
    glass: {
      background: 'rgba(15,21,36,0.6)',
      color: 'var(--on-surface)',
      border: '1px solid rgba(125,211,252,0.1)',
      backdropFilter: 'blur(16px)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--on-surface-variant)',
    },
  };

  return (
    <button
      style={{ ...base, ...variants[variant], ...(fullWidth ? { width: '100%' } : {}), ...style }}
      {...props}
    >
      {children}
    </button>
  );
}
