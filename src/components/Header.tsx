import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface Props {
  title?: string;
  showBack?: boolean;
  right?: React.ReactNode;
  onBack?: () => void;
}

export function Header({ title, showBack, right, onBack }: Props) {
  const navigate = useNavigate();
  const { totalItems } = useCart();

  return (
    <header style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 60,
      background: 'rgba(15,21,36,0.4)', backdropFilter: 'blur(24px)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px', height: 64,
    }}>
      <div style={{ width: 40, display: 'flex', alignItems: 'center' }}>
        {showBack && (
          <button onClick={onBack || (() => navigate(-1))} style={{
            color: 'var(--primary)', display: 'flex', alignItems: 'center',
            justifyContent: 'center',
          }} className="active:scale-90">
            <span className="material-symbols-outlined" style={{ fontSize: 28 }}>arrow_back</span>
          </button>
        )}
      </div>
      {title ? (
        <h1 style={{
          fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em',
          color: 'var(--primary)',
        }}>{title}</h1>
      ) : (
        <span style={{
          fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em',
          color: 'var(--primary)',
        }}>TRIPPIE</span>
      )}
      <div style={{ width: 40, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        {right || (
          <button onClick={() => navigate('/cart')} style={{ color: 'var(--primary)', position: 'relative' }} className="active:scale-90">
            <span className="material-symbols-outlined" style={{ fontSize: 28 }}>shopping_bag</span>
            {totalItems > 0 && (
              <span style={{
                position: 'absolute', top: -4, right: -4,
                background: 'var(--tertiary)', color: 'var(--on-tertiary)',
                fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: '50%', lineHeight: '14px',
              }}>{totalItems}</span>
            )}
          </button>
        )}
      </div>
    </header>
  );
}
