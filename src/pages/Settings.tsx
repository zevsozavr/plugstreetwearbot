import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { BottomBar } from '../components/BottomBar';
import { Icon } from '../components/Icon';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LangContext';

const SUPPORT_LINK = 'tg://resolve?domain=trippiestorebot';

export function Settings() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { t, lang, setLang } = useLang();
  const user = window.Telegram?.WebApp?.initDataUnsafe?.user;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 96, overflowX: 'hidden' }}>
      <Header title="" />

      <main style={{ padding: '24px 20px' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>{t('profile.title')}</h2>

        <div style={{
          background: 'rgba(15,21,36,0.6)', backdropFilter: 'blur(16px)',
          border: '1px solid rgba(125,211,252,0.1)', borderRadius: 12,
          padding: 16, display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12,
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%', overflow: 'hidden',
            border: '1px solid rgba(125,211,252,0.2)', flexShrink: 0,
            background: 'var(--surface-low)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="person" style={{ fontSize: 32, color: 'var(--primary)' }} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--primary)' }}>{user?.first_name || 'Guest'}</h3>
            <p style={{ fontSize: 12, color: 'var(--on-surface-variant)' }}>@{user?.username || 'user'}</p>
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <h4 style={{ fontSize: 11, fontWeight: 600, color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.2em', padding: '0 4px', marginBottom: 8 }}>{t('settings.lang')}</h4>
          <div style={{
            background: 'rgba(15,21,36,0.6)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(125,211,252,0.1)', borderRadius: 12, overflow: 'hidden',
          }}>
            {(['UA', 'RU'] as const).map((l) => (
              <button key={l} onClick={() => setLang(l)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: 16, cursor: 'pointer', background: lang === l ? 'rgba(125,211,252,0.08)' : 'transparent',
                  border: 'none', color: 'var(--on-surface)', borderBottom: '1px solid rgba(125,211,252,0.1)',
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Icon name={lang === l ? 'radio_button_checked' : 'radio_button_unchecked'} style={{ color: lang === l ? 'var(--primary)' : 'var(--on-surface-variant)' }} />
                  <span style={{ fontSize: 14 }}>{t('lang.' + l.toLowerCase())}</span>
                </div>
                {lang === l && <Icon name="check" style={{ color: 'var(--primary)' }} />}
              </button>
            ))}
          </div>
        </div>

        {isAdmin && (
          <div style={{ marginBottom: 12 }}>
            <h4 style={{ fontSize: 11, fontWeight: 600, color: 'var(--tertiary)', textTransform: 'uppercase', letterSpacing: '0.2em', padding: '0 4px', marginBottom: 8 }}>{t('profile.admin')}</h4>
            <div style={{
              background: 'rgba(15,21,36,0.6)', backdropFilter: 'blur(16px)',
              border: '1px solid rgba(125,211,252,0.1)', borderRadius: 12, overflow: 'hidden',
            }}>
              <button onClick={() => navigate('/admin')} style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: 16, cursor: 'pointer', background: 'transparent', border: 'none', color: 'var(--on-surface)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Icon name="admin_panel_settings" style={{ color: 'var(--tertiary)' }} />
                  <span style={{ fontSize: 14 }}>{t('profile.panel')}</span>
                </div>
                <Icon name="chevron_right" style={{ color: 'var(--on-surface-variant)' }} />
              </button>
            </div>
          </div>
        )}

        <div style={{ marginBottom: 12 }}>
          <h4 style={{ fontSize: 11, fontWeight: 600, color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.2em', padding: '0 4px', marginBottom: 8 }}>{t('profile.support')}</h4>
          <div style={{
            background: 'rgba(15,21,36,0.6)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(125,211,252,0.1)', borderRadius: 12, overflow: 'hidden',
          }}>
            <a href={SUPPORT_LINK} target="_blank" rel="noopener noreferrer" style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: 16, cursor: 'pointer', background: 'transparent', border: 'none', color: 'var(--on-surface)', textDecoration: 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Icon name="support_agent" style={{ color: 'var(--primary)' }} />
                <span style={{ fontSize: 14 }}>{t('profile.write')}</span>
              </div>
              <Icon name="chevron_right" style={{ color: 'var(--on-surface-variant)' }} />
            </a>
          </div>
        </div>
      </main>

      <BottomBar />
    </div>
  );
}
