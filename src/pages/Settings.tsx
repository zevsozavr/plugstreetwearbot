import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { useAuth } from '../context/AuthContext';

export function Settings() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const user = window.Telegram?.WebApp?.initDataUnsafe?.user;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 128, overflowX: 'hidden' }}>
      <header style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 60,
        background: 'rgba(15,21,36,0.4)', backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: 64,
      }}>
        <button className="material-symbols-outlined" style={{ fontSize: 28, color: 'var(--primary)' }}>menu</button>
        <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--primary)' }}>TRIPPIE</h1>
        <button className="material-symbols-outlined" style={{ fontSize: 28, color: 'var(--primary)' }}>shopping_bag</button>
      </header>

      <main style={{ paddingTop: 96, paddingLeft: 24, paddingRight: 24, maxWidth: 672, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 32 }}>
        <section className="glass-elevated" style={{ borderRadius: 16, padding: 24, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -48, top: -48, width: 128, height: 128, background: 'rgba(125,211,252,0.1)', filter: 'blur(64px)', borderRadius: '50%' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, position: 'relative', zIndex: 10 }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: 96, height: 96, borderRadius: '50%', border: '2px solid rgba(125,211,252,0.3)', padding: 4 }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--surface-low)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <Icon name="person" style={{ fontSize: 40, color: 'var(--primary)' }} />
                </div>
              </div>
              <button style={{ position: 'absolute', bottom: 0, right: 0, width: 32, height: 32, borderRadius: '50%', background: 'var(--primary)', color: 'var(--on-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} className="active:scale-90">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>edit</span>
              </button>
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>{user?.first_name || 'Guest'}</h2>
              <p style={{ fontSize: 13, color: 'var(--on-surface-variant)', fontWeight: 500, marginTop: 2 }}>@{user?.username || 'user'}</p>
              <div style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: 9999, fontSize: 11, fontWeight: 600, background: 'rgba(125,211,252,0.1)', color: 'var(--primary)', border: '1px solid rgba(125,211,252,0.2)' }}>
                Diamond Member
              </div>
            </div>
          </div>
        </section>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h3 style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(125,211,252,0.6)', padding: '0 8px' }}>Account</h3>
            <div className="glass-card" style={{ borderRadius: 16, overflow: 'hidden' }}>
              {[{ icon: 'notifications', label: 'Notifications' },
                { icon: 'local_shipping', label: 'Shipping Addresses' },
                { icon: 'payments', label: 'Payment Methods' },
                { icon: 'lock', label: 'Password' },
              ].map((item) => (
                <button key={item.label} style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: 16, background: 'transparent', border: 'none', color: 'var(--on-surface)',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }} className="hover:bg-white/5 transition-colors">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--on-surface-variant)' }}>{item.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{item.label}</span>
                  </div>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--on-surface-variant)' }}>chevron_right</span>
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h3 style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(125,211,252,0.6)', padding: '0 8px' }}>Preferences</h3>
            <div className="glass-card" style={{ borderRadius: 16, overflow: 'hidden' }}>
              <button style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: 16, background: 'transparent', border: 'none', color: 'var(--on-surface)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }} className="hover:bg-white/5 transition-colors group">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--on-surface-variant)' }}>payments</span>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>Currency</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12, color: 'var(--on-surface-variant)' }}>USD ($)</span>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--on-surface-variant)' }}>chevron_right</span>
                </div>
              </button>
              <button style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: 16, background: 'transparent', border: 'none', color: 'var(--on-surface)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }} className="hover:bg-white/5 transition-colors group">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--on-surface-variant)' }}>language</span>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>Language</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12, color: 'var(--on-surface-variant)' }}>English</span>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--on-surface-variant)' }}>chevron_right</span>
                </div>
              </button>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--on-surface-variant)' }}>dark_mode</span>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>Dark Mode</span>
                </div>
                <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked className="sr-only peer" style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
                  <div style={{ width: 44, height: 24, background: 'var(--surface-variant)', borderRadius: 9999, transition: 'all 0.3s', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 2, left: 2, width: 20, height: 20, background: '#fff', borderRadius: '50%', transition: 'all 0.3s', border: '1px solid rgba(255,255,255,0.1)' }} />
                  </div>
                </label>
              </div>
            </div>
          </div>

          {isAdmin && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <h3 style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--tertiary)', padding: '0 8px' }}>Admin</h3>
              <div className="glass-card" style={{ borderRadius: 16, overflow: 'hidden' }}>
                <button onClick={() => navigate('/admin')} style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: 16, background: 'transparent', border: 'none', color: 'var(--on-surface)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--tertiary)' }}>admin_panel_settings</span>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>Admin Panel</span>
                  </div>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--on-surface-variant)' }}>chevron_right</span>
                </button>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h3 style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(125,211,252,0.6)', padding: '0 8px' }}>Support &amp; Legals</h3>
            <div className="glass-card" style={{ borderRadius: 16, overflow: 'hidden' }}>
              {[{ icon: 'help_center', label: 'FAQ' },
                { icon: 'chat_bubble', label: 'Contact Us' },
                { icon: 'policy', label: 'Privacy Policy', external: true },
                { icon: 'gavel', label: 'Terms of Service', external: true },
              ].map((item) => (
                <button key={item.label} style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: 16, background: 'transparent', border: 'none', color: 'var(--on-surface)',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }} className="hover:bg-white/5 transition-colors">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--on-surface-variant)' }}>{item.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{item.label}</span>
                  </div>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--on-surface-variant)' }}>{item.external ? 'open_in_new' : 'chevron_right'}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <footer style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 24, marginTop: 32 }}>
          <button className="active:scale-[0.98] hover:bg-error/10 transition-all" style={{
            width: '100%', padding: 16, borderRadius: 12,
            border: '1px solid rgba(255,107,107,0.3)', color: 'var(--error)', fontWeight: 700, fontSize: 13,
            background: 'transparent',
          }}>
            Logout
          </button>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, opacity: 0.4 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Elite Ecosystem</p>
            <p style={{ fontSize: 10 }}>Version 4.2.0-stable</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
