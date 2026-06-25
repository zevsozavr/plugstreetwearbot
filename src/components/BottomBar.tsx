import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const tabs = [
  { label: 'Home', path: '/', icon: 'storefront' },
  { label: 'Catalog', path: '/products', icon: 'grid_view' },
  { label: 'Wishlist', path: '/favorites', icon: 'favorite' },
  { label: 'Cart', path: '/cart', icon: 'local_mall' },
  { label: 'Profile', path: '/settings', icon: 'settings' },
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
      padding: '8px 32px', paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
      background: 'rgba(20,28,46,0.3)', backdropFilter: 'blur(32px)',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      borderTopLeftRadius: 12, borderTopRightRadius: 12,
    }}>
      {tabs.map((tab) => {
        const active = location.pathname === tab.path ||
          (tab.path === '/products' && location.pathname.startsWith('/product'));
        const isCart = tab.icon === 'local_mall';
        return (
          <button key={tab.path} onClick={() => navigate(tab.path)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 48, height: 48, borderRadius: '50%',
              background: active ? 'var(--primary)' : 'transparent',
              color: active ? 'var(--on-primary)' : 'var(--on-surface-variant)',
              boxShadow: active ? '0 0 15px rgba(123,209,250,0.3)' : 'none',
              transition: 'all 0.2s', position: 'relative',
            }} className="active:scale-90">
              <span className="material-symbols-outlined" style={{
                fontSize: 24,
                fontVariationSettings: active ? "'FILL' 1, 'wght' 400" : "'FILL' 0, 'wght' 300",
              }}>
                {tab.icon}
              </span>
              {isCart && totalItems > 0 && (
                <span style={{
                  position: 'absolute', top: 4, right: 4,
                  background: 'var(--tertiary)', color: 'var(--on-tertiary)',
                  fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: '50%', lineHeight: '12px',
                }}>{totalItems}</span>
              )}
            </div>
            <span style={{ fontSize: 10, fontWeight: active ? 600 : 400, color: active ? 'var(--on-surface)' : 'var(--on-surface-variant)' }}>{tab.label}</span>
          </button>
        );
      })}
      {isAdmin && (
        <button onClick={() => navigate('/admin')} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 48, height: 48, borderRadius: '50%',
            color: location.pathname.startsWith('/admin') ? 'var(--secondary)' : 'var(--on-surface-variant)',
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 24 }}>admin_panel_settings</span>
          </div>
          <span style={{ fontSize: 10, color: 'var(--on-surface-variant)' }}>Admin</span>
        </button>
      )}
    </nav>
  );
}
