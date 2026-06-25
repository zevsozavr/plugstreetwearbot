import { useNavigate, useLocation } from 'react-router-dom'

const tabs = [
  { icon: 'storefront', label: 'Store', path: '/' },
  { icon: 'local_mall', label: 'Bag', path: '/cart' },
  { icon: 'favorite', label: 'Wishlist', path: '/favorites' },
  { icon: 'settings', label: 'Settings', path: '/settings' },
]

export function BottomBar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 50,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '8px 32px 24px',
        background: 'rgba(20, 28, 46, 0.3)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px 12px 0 0',
      }}
    >
      {tabs.map((t) => {
        const active = location.pathname === t.path || (t.path === '/' && location.pathname === '/')
        return (
          <button
            key={t.path}
            onClick={() => navigate(t.path)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              background: active ? '#7dd3fc' : 'transparent',
              color: active ? '#001f2e' : '#a0b4c4',
              borderRadius: active ? '50%' : 0,
              transition: 'all 0.2s',
              boxShadow: active ? '0 0 15px rgba(123,209,250,0.3)' : 'none',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: 24,
                fontVariationSettings: active ? "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24" : "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24",
              }}
            >
              {t.icon}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
