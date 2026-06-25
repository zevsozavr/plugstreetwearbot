import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'

import { BottomBar } from '../components/BottomBar'

export function Settings() {
  const navigate = useNavigate()
  const { isAdmin } = useAuth()
  const { lang, setLang } = useLang()
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
        <div style={{ width: 24 }} />
        <h1 style={{ fontFamily: 'Inter', fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', color: '#7dd3fc' }}>TRIPPIE</h1>
        <span className="material-symbols-outlined" style={{ color: '#7dd3fc', cursor: 'pointer' }} onClick={() => navigate('/cart')}>shopping_bag</span>
      </header>

      <main style={{ paddingTop: 96, paddingLeft: 24, paddingRight: 24 }}>



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
                  <span className="material-symbols-outlined">language</span>
                </div>
                <span style={{ fontWeight: 500, color: '#e0e8f0' }}>Language</span>
              </div>
              <div onClick={() => setLang(lang === 'UA' ? 'RU' : 'UA')} style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#7dd3fc' }}>
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



        {/* About */}
        <section style={{ paddingTop: 16, paddingBottom: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a0b4c4' }}>
            Version 4.2.0-GLACIER
          </p>
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
