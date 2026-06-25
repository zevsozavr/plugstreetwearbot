import type { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'glass' | 'ghost';
  fullWidth?: boolean;
  glow?: boolean;
}

export function Button({ variant = 'primary', fullWidth, glow, style, children, ...props }: Props) {
  const base: React.CSSProperties = {
    fontWeight: 600,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    padding: '14px 24px',
    borderRadius: 12,
    transition: 'all 0.2s',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    border: 'none',
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: 'var(--primary)',
      color: 'var(--on-primary)',
      ...(glow ? { boxShadow: '0 0 20px rgba(125,211,252,0.2)' } : {}),
    },
    glass: {
      background: 'rgba(125, 211, 252, 0.1)',
      color: 'var(--primary)',
      border: '1px solid rgba(125, 211, 252, 0.3)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--on-surface-variant)',
      border: '1px solid rgba(255,255,255,0.1)',
    },
  };

  return (
    <button
      className="active:scale-95"
      style={{ ...base, ...variants[variant], ...(fullWidth ? { width: '100%' } : {}), ...style }}
      {...props}
    >
      {children}
    </button>
  );
}
