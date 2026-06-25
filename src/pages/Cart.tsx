import { useNavigate } from 'react-router-dom';
import { BottomBar } from '../components/BottomBar';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LangContext';

export function Cart() {
  const navigate = useNavigate();
  const { items, totalPrice, updateQuantity, removeItem } = useCart();
  const { t } = useLang();

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 96, overflowX: 'hidden' }}>
      <header style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 60,
        background: 'rgba(15,21,36,0.4)', backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(125,211,252,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px', height: 64,
      }}>
        <button onClick={() => navigate(-1)} style={{ color: 'var(--primary)' }} className="active:scale-90">
          <span className="material-symbols-outlined" style={{ fontSize: 28 }}>arrow_back</span>
        </button>
        <h1 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--primary)' }}>{t('cart.title')}</h1>
        <div style={{ width: 40 }} />
      </header>

      <main style={{ paddingTop: 80, paddingLeft: 20, paddingRight: 20 }}>
        {items.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'rgba(15,21,36,0.6)', backdropFilter: 'blur(16px)',
              border: '1px solid rgba(125,211,252,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 36, color: 'var(--on-surface-variant)' }}>local_mall</span>
            </div>
            <p style={{ fontSize: 16, color: 'var(--on-surface-variant)' }}>{t('cart.empty')}</p>
            <button onClick={() => navigate('/')} style={{
              padding: '12px 32px', borderRadius: 12,
              background: 'var(--primary)', color: 'var(--on-primary)',
              fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em',
            }}>{t('cart.continue')}</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {items.map((item) => {
                const key = item.id + item.selectedSize + item.selectedColor;
                return (
                  <div key={key} style={{
                    display: 'flex', gap: 16, padding: 12,
                    background: 'rgba(15,21,36,0.6)', backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(125,211,252,0.1)', borderRadius: 12,
                  }}>
                    <div style={{ width: 80, height: 104, flexShrink: 0, borderRadius: 8, overflow: 'hidden', background: 'var(--surface-container-low)' }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{t('categories.' + item.category)}</p>
                          <h3 style={{ fontSize: 15, fontWeight: 700 }}>{item.name}</h3>
                          <p style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginTop: 2 }}>{item.selectedColor} / {t('cart.size')} {item.selectedSize}</p>
                        </div>
                        <button onClick={() => removeItem(key)} style={{ color: 'var(--on-surface-variant)', background: 'none', padding: 2 }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
                        </button>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8,
                          background: 'rgba(15,21,36,0.6)', backdropFilter: 'blur(16px)',
                          border: '1px solid rgba(125,211,252,0.1)',
                          padding: '4px 8px', borderRadius: 9999,
                        }}>
                          <button onClick={() => updateQuantity(key, item.quantity - 1)} style={{ background: 'none', color: 'var(--on-surface-variant)', display: 'flex' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>remove</span>
                          </button>
                          <span style={{ fontSize: 14, fontWeight: 600, width: 20, textAlign: 'center' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(key, item.quantity + 1)} style={{ background: 'none', color: 'var(--on-surface-variant)', display: 'flex' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span>
                          </button>
                        </div>
                        <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--primary)' }}>{(item.price * item.quantity).toLocaleString()}₴</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{
              background: 'rgba(15,21,36,0.6)', backdropFilter: 'blur(16px)',
              border: '1px solid rgba(125,211,252,0.1)', borderRadius: 12,
              padding: 24,
            }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input placeholder={t('cart.promo') || 'Promo code'}
                    style={{
                      flex: 1, padding: '10px 14px', borderRadius: 8,
                      border: '1px solid rgba(125,211,252,0.1)',
                      background: 'rgba(15,21,36,0.6)', backdropFilter: 'blur(8px)',
                      fontSize: 13, color: 'var(--on-surface)',
                    }} />
                  <button style={{
                    padding: '10px 20px', borderRadius: 8,
                    background: 'var(--primary)', color: 'var(--on-primary)',
                    fontSize: 12, fontWeight: 600, textTransform: 'uppercase',
                  }}>{t('cart.apply') || 'Apply'}</button>
                </div>
              </div>

              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>{t('cart.summary')}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 14, color: 'var(--on-surface-variant)' }}>{t('cart.subtotal')}</span>
                  <span style={{ fontSize: 14 }}>{totalPrice.toLocaleString()}₴</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 14, color: 'var(--on-surface-variant)' }}>{t('cart.shipping')}</span>
                  <span style={{ fontSize: 14, color: 'var(--primary)' }}>{t('cart.shipping.calc')}</span>
                </div>
              </div>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                paddingTop: 16, borderTop: '1px solid rgba(125,211,252,0.1)', marginBottom: 20,
              }}>
                <span style={{ fontSize: 18, fontWeight: 700 }}>{t('cart.total')}</span>
                <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--primary)' }}>{totalPrice.toLocaleString()}₴</span>
              </div>
              <button onClick={() => navigate('/checkout')} style={{
                width: '100%', padding: '16px 0', borderRadius: 12,
                background: 'var(--primary)', color: 'var(--on-primary)',
                fontSize: 12, fontWeight: 600, textTransform: 'uppercase',
                letterSpacing: '0.05em', border: 'none',
                boxShadow: '0 0 30px rgba(125,211,252,0.05)',
              }} className="active:scale-95">
                {t('cart.checkout')}
              </button>
            </div>
          </div>
        )}
      </main>

      <BottomBar />
    </div>
  );
}
