import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'

import { BottomBar } from '../components/BottomBar'

export function Settings() {
  const navigate = useNavigate()
  const { isAdmin } = useAuth()
  const { lang } = useLang()
  const [darkMode, setDarkMode] = useState(true)

  const sectionStyle: React.CSSProperties = {
    background: 'rgba(15, 21, 36, 0.6)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(125, 211, 252, 0.1)',
    borderRadius: 16,
    overflow: 'hidden',
  }

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    cursor: 'pointer',
  }

  const rowBorder: React.CSSProperties = {
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  }

  return (
    <div style={{ background: '#0a0e1a', minHeight: '100vh', maxWidth: 390, margin: '0 auto', overflowX: 'hidden', paddingBottom: 128 }}>
      {/* Top App Bar */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          maxWidth: 390,
          background: 'rgba(15, 21, 36, 0.4)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          zIndex: 50,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 24px',
          height: 64,
        }}
      >
        <span className="material-symbols-outlined" style={{ color: '#7dd3fc', cursor: 'pointer' }}>menu</span>
        <h1 style={{ fontFamily: 'Inter', fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', color: '#7dd3fc' }}>ELITE</h1>
        <span className="material-symbols-outlined" style={{ color: '#7dd3fc', cursor: 'pointer' }}>shopping_bag</span>
      </header>

      <main style={{ paddingTop: 96, paddingLeft: 24, paddingRight: 24 }}>
        {/* Profile Section */}
        <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
          <div style={{ position: 'relative' }}>
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: '50%',
                padding: 4,
                background: 'linear-gradient(to top right, #7dd3fc, #c8a0f0)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
                alt="Profile"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #0a0e1a',
                }}
              />
            </div>
            <button
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                padding: 8,
                background: 'rgba(15, 21, 36, 0.75)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderRadius: '50%',
                color: '#7dd3fc',
                border: '1px solid rgba(125, 211, 252, 0.2)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>edit</span>
            </button>
          </div>
          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', color: '#e0e8f0' }}>Julian Vane</h2>
            <p style={{ color: '#a0b4c4', fontSize: 14, fontWeight: 500 }}>julian.vane@elite.tech</p>
          </div>
        </section>

        {/* Account Management */}
        <section style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700, color: '#7dd3fc', opacity: 0.7, padding: '0 4px', marginBottom: 12 }}>
            Account Management
          </h3>
          <div style={sectionStyle}>
            {[
              { icon: 'notifications', label: 'Notifications' },
              { icon: 'local_shipping', label: 'Shipping Addresses' },
              { icon: 'payments', label: 'Payment Methods' },
              { icon: 'lock_open', label: 'Password' },
            ].map((item, i) => (
              <div key={item.label} style={{ ...rowStyle, ...(i < 3 ? rowBorder : {}) }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 24,
                      background: 'rgba(125, 211, 252, 0.1)',
                      color: '#7dd3fc',
                    }}
                  >
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  <span style={{ fontWeight: 500, color: '#e0e8f0' }}>{item.label}</span>
                </div>
                <span className="material-symbols-outlined" style={{ color: '#a0b4c4', fontSize: 20 }}>chevron_right</span>
              </div>
            ))}
          </div>
        </section>

        {/* Preferences */}
        <section style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700, color: '#c8a0f0', opacity: 0.7, padding: '0 4px', marginBottom: 12 }}>
            Preferences
          </h3>
          <div style={sectionStyle}>
            <div style={{ ...rowStyle, ...rowBorder }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 24,
                    background: 'rgba(200, 160, 240, 0.1)',
                    color: '#c8a0f0',
                  }}
                >
                  <span className="material-symbols-outlined">currency_exchange</span>
                </div>
                <span style={{ fontWeight: 500, color: '#e0e8f0' }}>Currency</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#7dd3fc' }}>
                <span style={{ fontSize: 14, fontWeight: 700 }}>USD</span>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>expand_more</span>
              </div>
            </div>
            <div style={{ ...rowStyle, ...rowBorder }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 24,
                    background: 'rgba(200, 160, 240, 0.1)',
                    color: '#c8a0f0',
                  }}
                >
                  <span className="material-symbols-outlined">language</span>
                </div>
                <span style={{ fontWeight: 500, color: '#e0e8f0' }}>Language</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#7dd3fc' }}>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{lang === 'UA' ? 'Українська' : 'Русский'}</span>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>expand_more</span>
              </div>
            </div>
            <div style={rowStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 24,
                    background: 'rgba(200, 160, 240, 0.1)',
                    color: '#c8a0f0',
                  }}
                >
                  <span className="material-symbols-outlined">dark_mode</span>
                </div>
                <span style={{ fontWeight: 500, color: '#e0e8f0' }}>Dark Mode</span>
              </div>
              <div
                onClick={() => setDarkMode(!darkMode)}
                style={{
                  width: 48,
                  height: 24,
                  background: 'rgba(125, 211, 252, 0.2)',
                  borderRadius: 9999,
                  position: 'relative',
                  padding: 4,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all 0.3s',
                }}
              >
                <div
                  style={{
                    width: 16,
                    height: 16,
                    background: '#7dd3fc',
                    borderRadius: '50%',
                    position: 'absolute',
                    right: darkMode ? 4 : undefined,
                    left: darkMode ? undefined : 4,
                    boxShadow: '0 0 10px rgba(125,211,252,0.6)',
                    transition: 'all 0.3s',
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Support & Legals */}
        <section style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700, color: '#a0b4c4', padding: '0 4px', marginBottom: 12 }}>
            Support &amp; Legals
          </h3>
          <div style={sectionStyle}>
            {[
              { icon: 'launch', label: 'FAQ' },
              { icon: 'mail', label: 'Contact Us' },
              { icon: 'policy', label: 'Privacy Policy' },
              { icon: 'description', label: 'Terms of Service' },
            ].map((item, i) => (
              <div key={item.label} style={{ ...rowStyle, ...(i < 3 ? rowBorder : {}) }}>
                <span style={{ fontWeight: 500, opacity: 0.8, color: '#e0e8f0', fontSize: 14 }}>{item.label}</span>
                <span className="material-symbols-outlined" style={{ color: '#a0b4c4', opacity: 0.5, fontSize: 20 }}>{item.icon}</span>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section style={{ paddingTop: 16, paddingBottom: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a0b4c4' }}>
              Version 4.2.0-GLACIER
            </p>
            <p style={{ fontSize: 10, color: 'rgba(125, 211, 252, 0.4)', marginTop: 4 }}>
              ELITE LUXURY BOUTIQUE TM
            </p>
          </div>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 40px',
              borderRadius: 9999,
              border: '1px solid rgba(255, 107, 107, 0.3)',
              background: 'rgba(255, 107, 107, 0.05)',
              color: '#ff6b6b',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>logout</span>
            Logout
          </button>
          {isAdmin && (
            <button
              onClick={() => navigate('/admin')}
              style={{
                padding: '12px 32px',
                borderRadius: 9999,
                background: 'rgba(200, 160, 240, 0.2)',
                border: '1px solid rgba(200, 160, 240, 0.3)',
                color: '#c8a0f0',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: 14,
              }}
            >
              Admin Panel
            </button>
          )}
        </section>
      </main>

      <BottomBar />
    </div>
  )
}
