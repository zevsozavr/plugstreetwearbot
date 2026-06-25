import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  style?: React.CSSProperties;
  card?: boolean;
  elevated?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export function Glass({ children, style, card, elevated, glow, onClick }: Props) {
  const cls = elevated ? 'glass-elevated' : 'glass-card';
  return (
    <div
      className={cls}
      style={{
        position: 'relative',
        ...(card ? { boxShadow: 'inset 0 1px 1px rgba(125,211,252,0.08)' } : {}),
        ...(glow ? { boxShadow: '0 0 30px rgba(125, 211, 252, 0.05)' } : {}),
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
