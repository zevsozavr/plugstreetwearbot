import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  style?: React.CSSProperties;
  card?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export function Glass({ children, style, card, glow, onClick }: Props) {
  const base: React.CSSProperties = {
    background: card ? 'var(--glass-card-bg)' : 'var(--glass-bg)',
    backdropFilter: 'blur(12px)',
    border: `1px solid ${card ? 'var(--glass-card-border)' : 'var(--glass-border)'}`,
    ...(card ? { boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1)' } : {}),
    ...(glow ? { boxShadow: '0 0 20px rgba(243,235,227,0.12)' } : {}),
    position: 'relative' as const,
    ...style,
  };
  return (
    <div style={base} onClick={onClick}>
      {glow && <div style={{ position: 'absolute', inset: -1, background: 'radial-gradient(circle at top left, rgba(243,235,227,0.08), transparent 70%)', borderRadius: 'inherit', pointerEvents: 'none', zIndex: -1 }} />}
      {children}
    </div>
  );
}
