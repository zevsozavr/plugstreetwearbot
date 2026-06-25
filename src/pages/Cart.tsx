import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
export function Cart() {
  const navigate = useNavigate();
  const { items, totalPrice, updateQuantity, removeItem } = useCart();

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', overflowX: 'hidden' }}>
      <header style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 60,
        background: 'rgba(15,21,36,0.4)', backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: 64,
      }}>
        <button onClick={() => navigate(-1)} style={{ color: 'var(--primary)' }} className="active:scale-90">
          <span className="material-symbols-outlined" style={{ fontSize: 28 }}>arrow_back</span>
        </button>
        <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--primary)' }}>TRIPPIE</h1>
        <div style={{ position: 'relative' }}>
          <button style={{ color: 'var(--primary)' }} className="active:scale-90">
            <span className="material-symbols-outlined" style={{ fontSize: 28, fontVariationSettings: "'FILL' 1" }}>shopping_bag</span>
          </button>
          {items.length > 0 && (
            <span style={{
              position: 'absolute', top: -4, right: -4,
              background: 'var(--tertiary)', color: 'var(--on-tertiary)',
              fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: '50%', lineHeight: '14px',
            }}>{items.length}</span>
          )}
        </div>
      </header>

      <main style={{ paddingTop: 96, paddingLeft: 16, paddingRight: 16, paddingBottom: 128 }}>
        {items.length === 0 ? (
          <div style={{ paddingTop: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 24 }}>
            <div className="glass-card" style={{ width: 96, height: 96, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--on-surface-variant)', opacity: 0.3 }}>shopping_bag</span>
            </div>
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 600 }}>Your bag is empty</h3>
              <p style={{ fontSize: 14, color: 'var(--on-surface-variant)', marginTop: 8, maxWidth: 288 }}>Explore our latest drops and find the next piece for your collection.</p>
            </div>
            <button onClick={() => navigate('/')} className="ice-button" style={{ padding: '14px 32px', borderRadius: 12, fontWeight: 700, fontSize: 13, color: 'var(--primary)' }}>Start Shopping</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: 24, fontWeight: 600 }}>Shopping Bag</h2>
              <span style={{ fontSize: 13, color: 'var(--on-surface-variant)' }}>{items.length} Items</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {items.map((item) => {
                const key = item.id + item.selectedSize + item.selectedColor;
                return (
                  <div key={key} className="glass-card" style={{ borderRadius: 16, padding: 16, display: 'flex', gap: 16 }}>
                    <div style={{ width: 96, height: 128, borderRadius: 8, overflow: 'hidden', flexShrink: 0, background: 'var(--surface-variant)' }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '4px 0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <h3 style={{ fontWeight: 500, fontSize: 14 }}>{item.name}</h3>
                          <p style={{ fontSize: 11, color: 'var(--on-surface-variant)', marginTop: 2 }}>Size: {item.selectedSize} &bull; Color: {item.selectedColor}</p>
                        </div>
                        <button onClick={() => removeItem(key)} style={{ color: 'var(--on-surface-variant)', padding: 4 }} className="hover:text-error">
                          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>delete</span>
                        </button>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          background: 'var(--surface-container-low)', borderRadius: 9999,
                          padding: '4px 12px', border: '1px solid rgba(255,255,255,0.05)',
                        }}>
                          <button onClick={() => updateQuantity(key, item.quantity - 1)} style={{ color: 'var(--on-surface-variant)' }} className="active:scale-90">
                            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>remove</span>
                          </button>
                          <span style={{ fontSize: 14, fontWeight: 600, width: 16, textAlign: 'center' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(key, item.quantity + 1)} style={{ color: 'var(--on-surface-variant)' }} className="active:scale-90">
                            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>add</span>
                          </button>
                        </div>
                        <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--primary)' }}>{(item.price * item.quantity).toLocaleString()}₴</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="glass-card" style={{ borderRadius: 16, padding: 16, display: 'flex', gap: 8 }}>
              <input placeholder="Promo Code"
                style={{
                  flex: 1, padding: '10px 16px', borderRadius: 8,
                  background: 'var(--surface-container-low)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontSize: 13, color: 'var(--on-surface)',
                }} />
              <button className="ice-button active:scale-95" style={{ padding: '10px 24px', borderRadius: 8, fontSize: 12, fontWeight: 600, color: 'var(--primary)' }}>Apply</button>
            </div>

            <div className="glass-elevated" style={{ borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
              <h3 style={{ fontWeight: 600, fontSize: 18, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 16 }}>Order Summary</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'var(--on-surface-variant)' }}>Subtotal</span>
                  <span style={{ fontWeight: 500 }}>{totalPrice.toLocaleString()}₴</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'var(--on-surface-variant)' }}>Shipping</span>
                  <span style={{ color: 'var(--tertiary)', fontWeight: 500 }}>Complimentary</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'var(--on-surface-variant)' }}>Estimated Tax</span>
                  <span style={{ fontWeight: 500 }}>{(totalPrice * 0.08).toFixed(0)}₴</span>
                </div>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <span style={{ fontWeight: 700, fontSize: 18 }}>Total</span>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: 28, fontWeight: 900, color: 'var(--primary)' }}>{totalPrice.toLocaleString()}₴</span>
                  <p style={{ fontSize: 10, color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>USD Incl. Tax</p>
                </div>
              </div>
              <button onClick={() => navigate('/checkout')} className="ice-button-primary active:scale-[0.98]" style={{
                width: '100%', padding: '16px 0', borderRadius: 12, fontWeight: 700, fontSize: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, border: 'none',
              }}>
                Checkout Now
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
              </button>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 28, color: 'rgba(160,180,196,0.4)' }}>credit_card</span>
                <span className="material-symbols-outlined" style={{ fontSize: 28, color: 'rgba(160,180,196,0.4)' }}>account_balance_wallet</span>
                <span className="material-symbols-outlined" style={{ fontSize: 28, color: 'rgba(160,180,196,0.4)' }}>currency_bitcoin</span>
              </div>
            </div>

            <div className="glass-card" style={{ borderRadius: 16, padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(125,211,252,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--primary)' }}>verified_user</span>
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600 }}>Secure Transaction</p>
                <p style={{ fontSize: 10, color: 'var(--on-surface-variant)' }}>256-bit SSL encrypted checkout</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Background decoration */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -10, pointerEvents: 'none', opacity: 0.4 }}>
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: 384, height: 384, background: 'rgba(125,211,252,0.1)', borderRadius: '50%', filter: 'blur(120px)' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: 500, height: 500, background: 'rgba(200,160,240,0.05)', borderRadius: '50%', filter: 'blur(150px)' }} />
      </div>
    </div>
  );
}
