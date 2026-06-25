import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const tabs = [
  { label: 'Home', path: '/', icon: 'home' },
  { label: 'Catalog', path: '/products', icon: 'grid_view' },
  { label: 'Favorites', path: '/favorites', icon: 'favorite' },
  { label: 'Cart', path: '/cart', icon: 'shopping_cart' },
  { label: 'Profile', path: '/settings', icon: 'person' },
];

export function BottomBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();
  const { isAdmin } = useAuth();

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, width: '100%', zIndex: 50,
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '12px 16px', paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))',
      background: 'var(--glass-bg)', backdropFilter: 'blur(24px)',
      borderTop: '1px solid var(--glass-border)',
      borderTopLeftRadius: 12, borderTopRightRadius: 12,
    }}>
      {tabs.map((tab) => {
        const active = location.pathname === tab.path || (tab.path === '/products' && location.pathname.startsWith('/product'));
        return (
          <button key={tab.path} onClick={() => navigate(tab.path)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '4px 16px', borderRadius: 'var(--radius-full)',
            background: active ? 'var(--primary-container)' : 'transparent',
            color: active ? 'var(--on-surface)' : 'var(--on-surface-variant)',
            opacity: active ? 1 : 0.6, transition: 'all 0.3s',
            position: 'relative', fontWeight: active ? 600 : 400,
          }}>
            <span className="material-symbols-outlined" style={{
              fontSize: 24,
              fontVariationSettings: active ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
            }}>
              {tab.icon === 'shopping_cart' && totalItems > 0 ? 'shopping_cart' : tab.icon}
            </span>
            <span style={{ font: 'var(--font-label)', fontSize: 10, marginTop: 2 }}>{tab.label}</span>
            {tab.icon === 'shopping_cart' && totalItems > 0 && (
              <span style={{
                position: 'absolute', top: 0, right: 4, width: 16, height: 16,
                borderRadius: '50%', background: 'var(--primary)', color: 'var(--on-primary)',
                fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{totalItems}</span>
            )}
          </button>
        );
      })}
      {isAdmin && (
        <button onClick={() => navigate('/admin')} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '4px 16px', color: location.pathname.startsWith('/admin') ? 'var(--secondary)' : 'var(--on-surface-variant)',
          opacity: location.pathname.startsWith('/admin') ? 1 : 0.6,
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 24 }}>admin_panel_settings</span>
          <span style={{ font: 'var(--font-label)', fontSize: 10, marginTop: 2 }}>Admin</span>
        </button>
      )}
    </nav>
  );
}