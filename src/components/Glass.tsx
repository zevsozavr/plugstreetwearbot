import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  style?: React.CSSProperties;
  card?: boolean;
  glow?: boolean;
  onClick?: () => void;
  elevated?: boolean;
}

export function Glass({ children, style, card, glow, elevated, onClick }: Props) {
  const base: React.CSSProperties = {
    background: elevated
      ? 'rgba(15, 21, 36, 0.75)'
      : card
        ? 'rgba(15, 21, 36, 0.6)'
        : 'rgba(15, 21, 36, 0.6)',
    backdropFilter: elevated ? 'blur(24px)' : 'blur(16px)',
    border: `1px solid ${
      elevated
        ? 'rgba(125, 211, 252, 0.15)'
        : 'rgba(125, 211, 252, 0.1)'
    }`,
    ...(card || elevated
      ? { boxShadow: 'inset 0 1px 1px rgba(125,211,252,0.08)' }
      : {}),
    ...(glow ? { boxShadow: '0 0 30px rgba(125, 211, 252, 0.05)' } : {}),
    position: 'relative' as const,
    ...style,
  };
  return (
    <div style={base} onClick={onClick}>
      {glow && (
        <div style={{
          position: 'absolute', inset: -1,
          background: 'radial-gradient(circle at top left, rgba(125,211,252,0.08), transparent 70%)',
          borderRadius: 'inherit', pointerEvents: 'none', zIndex: -1,
        }} />
      )}
      {children}
    </div>
  );
}
