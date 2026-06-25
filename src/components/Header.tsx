import { useNavigate } from 'react-router-dom';

interface Props {
  title?: string;
  showBack?: boolean;
  right?: React.ReactNode;
  onBack?: () => void;
}

export function Header({ title, showBack, right, onBack }: Props) {
  const navigate = useNavigate();

  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 20px', height: 64, position: 'sticky', top: 0, zIndex: 60,
      background: 'rgba(15,21,36,0.4)', backdropFilter: 'blur(24px)',
      borderBottom: '1px solid rgba(125,211,252,0.1)',
    }}>
      <div style={{ width: 40, display: 'flex', alignItems: 'center' }}>
        {showBack && (
          <button onClick={onBack || (() => navigate(-1))} style={{
            color: 'var(--primary)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', padding: 4,
          }} className="active:scale-90">
            <span className="material-symbols-outlined" style={{ fontSize: 24 }}>arrow_back</span>
          </button>
        )}
      </div>
      {title ? (
        <h1 style={{ font: 'var(--font-headline)', color: 'var(--primary)' }}>{title}</h1>
      ) : (
        <span style={{
          font: '800 22px/1 Inter, sans-serif', letterSpacing: '-0.03em',
          color: 'var(--primary)',
        }}>TRIPPIE</span>
      )}
      <div style={{ width: 40, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        {right}
      </div>
    </header>
  );
}
