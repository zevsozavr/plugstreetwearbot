import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { useLang } from '../context/LangContext';

export function OrderConfirmed() {
  const navigate = useNavigate();
  const { t } = useLang();

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%',
        background: 'radial-gradient(ellipse at top, rgba(125,211,252,0.06), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: -128, right: -128, width: 384, height: 384,
        background: 'rgba(125,211,252,0.06)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -128, left: -128, width: 384, height: 384,
        background: 'rgba(125,211,252,0.04)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'var(--primary-container)',
          border: '1px solid rgba(125,211,252,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 24, boxShadow: '0 0 40px rgba(125,211,252,0.1)',
        }}>
          <span className="material-symbols-outlined" style={{
            fontVariationSettings: "'FILL' 1, 'wght' 400",
            color: 'var(--primary)', fontSize: 40,
          }}>check_circle</span>
        </div>

        <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8, textTransform: 'uppercase' }}>{t('order.title')}</h1>
        <p style={{ fontSize: 14, color: 'var(--on-surface-variant)', marginBottom: 24, maxWidth: 300, textAlign: 'center' }}>
          {t('order.message')}
        </p>

        <div style={{
          width: '100%', borderRadius: 12, padding: 24, marginBottom: 24,
          background: 'rgba(15,21,36,0.75)', backdropFilter: 'blur(24px)',
          border: '1px solid rgba(125,211,252,0.15)',
          boxShadow: '0 0 30px rgba(125,211,252,0.05)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(125,211,252,0.1)', paddingBottom: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--on-surface-variant)' }}>{t('order.number')}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)' }}>#CC-{Math.floor(Math.random() * 90000) + 10000}</span>
              <button style={{ background: 'none', color: 'var(--on-surface-variant)', display: 'flex' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>content_copy</span>
              </button>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, color: 'var(--on-surface-variant)', fontSize: 13 }}>
              <span>{t('order.amount')}</span>
              <span style={{ color: 'var(--on-surface)' }}>{t('order.included')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, color: 'var(--on-surface-variant)', fontSize: 13 }}>
              <span>{t('checkout.delivery')}</span>
              <span style={{ color: 'var(--primary)', opacity: 0.8 }}>{t('order.free')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(125,211,252,0.1)', paddingTop: 12, marginTop: 8 }}>
              <span style={{ fontWeight: 700 }}>{t('checkout.total')}</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--primary)' }}>{t('order.charged')}</span>
            </div>
          </div>
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Button fullWidth glow variant="primary" onClick={() => navigate('/')} style={{ borderRadius: 12 }}>
            {t('order.continue')}
          </Button>
        </div>
      </main>
    </div>
  );
}
