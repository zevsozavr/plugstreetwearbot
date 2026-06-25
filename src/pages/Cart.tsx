import { useNavigate } from 'react-router-dom';
import { BottomBar } from '../components/BottomBar';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LangContext';

export function Cart() {
  const navigate = useNavigate();
  const { items, totalPrice, updateQuantity, removeItem } = useCart();
  const { t } = useLang();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg)' }}>
      <header style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 50,
        background: 'var(--glass-bg)', backdropFilter: 'blur(12px)',
        boxShadow: '0 1px 0 rgba(224,232,240,0.05)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 var(--pad)', height: 64, maxWidth: 'var(--container-max)', margin: '0 auto',
        }}>
          <button onClick={() => navigate(-1)} style={{ color: 'var(--on-surface)' }}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 style={{ font: 'var(--font-headline)', letterSpacing: '0.1em', color: 'var(--on-surface)', textTransform: 'uppercase', fontWeight: 700 }}>TRIPPIE</h1>
          <button style={{ color: 'var(--on-surface)' }}>
            <span className="material-symbols-outlined">shopping_bag</span>
          </button>
        </div>
      </header>

      <main style={{ paddingTop: 96, paddingLeft: 'var(--pad)', paddingRight: 'var(--pad)', maxWidth: 'var(--container-max)', margin: '0 auto', paddingBottom: 128 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          <div style={{ flexGrow: 1 }}>
            <h2 style={{ font: 'var(--font-headline-sm)', fontSize: 32, lineHeight: '40px', marginBottom: 32 }}>{t('cart.title')} <span style={{ color: 'var(--on-surface-variant)', opacity: 0.5, fontWeight: 300 }}>({items.length})</span></h2>
            {items.length === 0 ? (
              <div style={{ textAlign: 'center', paddingTop: 40 }}>
                <p style={{ font: 'var(--font-body)', color: 'var(--on-surface-variant)', marginBottom: 16 }}>{t('cart.empty')}</p>
                <button onClick={() => navigate('/')} style={{
                  padding: '14px 24px', borderRadius: 'var(--rounded-lg)',
                  border: '1px solid var(--glass-border)', background: 'var(--glass-bg)',
                  color: 'var(--on-surface)', font: 'var(--font-label)',
                }}>{t('cart.continue')}</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {items.map((item) => {
                  const key = item.id + item.selectedSize + item.selectedColor;
                  return (
                    <div key={key} style={{ display: 'flex', gap: 24, paddingBottom: 24, borderBottom: '1px solid var(--glass-border)' }}>
                      <div style={{ width: 96, height: 128, flexShrink: 0, borderRadius: 'var(--rounded-lg)', overflow: 'hidden', background: 'var(--surface-container-low)' }}>
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <p style={{ font: 'var(--font-label)', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{t('categories.' + item.category)}</p>
                            <h3 style={{ font: 'var(--font-headline)', fontSize: 22 }}>{item.name}</h3>
                            <p style={{ font: 'var(--font-body)', color: 'var(--on-surface-variant)' }}>{item.selectedColor} / {t('cart.size')} {item.selectedSize}</p>
                          </div>
                          <button onClick={() => removeItem(key)} style={{ color: 'var(--on-surface-variant)', background: 'none' }}>
                            <span className="material-symbols-outlined">close</span>
                          </button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'var(--glass-bg)', backdropFilter: 'blur(12px)', border: '1px solid var(--glass-border)', padding: '6px 12px', borderRadius: 'var(--radius-full)' }}>
                            <button onClick={() => updateQuantity(key, item.quantity - 1)} style={{ color: 'var(--on-surface-variant)', background: 'none' }}>
                              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>remove</span>
                            </button>
                            <span style={{ font: 'var(--font-body)', width: 16, textAlign: 'center' }}>{item.quantity}</span>
                            <button onClick={() => updateQuantity(key, item.quantity + 1)} style={{ color: 'var(--on-surface-variant)', background: 'none' }}>
                              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
                            </button>
                          </div>
                          <p style={{ font: 'var(--font-headline)', fontSize: 22 }}>{(item.price * item.quantity).toLocaleString()}₴</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <aside style={{ width: '100%', flexShrink: 0 }}>
              <div style={{
                background: 'var(--glass-bg)', backdropFilter: 'blur(12px)',
                border: '1px solid var(--glass-border)', borderRadius: 'var(--rounded-xl)',
                padding: 32, position: 'sticky', top: 96,
              }}>
                <h2 style={{ font: 'var(--font-headline)', marginBottom: 32 }}>{t('cart.summary')}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ font: 'var(--font-body)', color: 'var(--on-surface-variant)' }}>{t('cart.subtotal')}</p>
                    <p style={{ font: 'var(--font-body)' }}>{totalPrice.toLocaleString()}₴</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ font: 'var(--font-body)', color: 'var(--on-surface-variant)' }}>{t('cart.shipping')}</p>
                    <p style={{ font: 'var(--font-body)' }}>{t('cart.shipping.calc')}</p>
                  </div>
                </div>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                  paddingBottom: 32, marginBottom: 32, borderBottom: '1px solid var(--glass-border)',
                }}>
                  <p style={{ font: 'var(--font-headline)' }}>{t('cart.total')}</p>
                  <p style={{ font: 'var(--font-headline)', color: 'var(--primary)' }}>{totalPrice.toLocaleString()}₴</p>
                </div>
                <button onClick={() => navigate('/checkout')} style={{
                  width: '100%', padding: '16px 0', borderRadius: 'var(--radius-full)',
                  background: 'var(--primary)', color: 'var(--on-primary)',
                  font: 'var(--font-label)', fontSize: 12, textTransform: 'uppercase',
                  letterSpacing: '0.1em', boxShadow: '0 10px 20px rgba(125,211,252,0.15)',
                }}>
                  {t('cart.checkout')}
                </button>
              </div>
            </aside>
          )}
        </div>
      </main>

      <BottomBar />
    </div>
  );
}