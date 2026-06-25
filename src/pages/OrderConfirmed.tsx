import { useNavigate } from 'react-router-dom';

export function OrderConfirmed() {
  const navigate = useNavigate();

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 32, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', background: 'radial-gradient(ellipse at top, rgba(125,211,252,0.06), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: -128, right: -128, width: 384, height: 384, background: 'rgba(125,211,252,0.06)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -128, left: -128, width: 384, height: 384, background: 'rgba(125,211,252,0.04)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />

      <header style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 60,
        background: 'rgba(15,21,36,0.4)', backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: 64,
      }}>
        <button className="material-symbols-outlined" style={{ fontSize: 28, color: 'var(--primary)' }}>menu</button>
        <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--primary)' }}>TRIPPIE</span>
        <button className="material-symbols-outlined" style={{ fontSize: 28, color: 'var(--primary)' }}>shopping_bag</button>
      </header>

      <main style={{ paddingTop: 96, paddingLeft: 24, paddingRight: 24, maxWidth: 896, margin: '0 auto' }}>
        <section style={{ textAlign: 'center', padding: '32px 0', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ position: 'relative', display: 'inline-block', margin: '0 auto' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(125,211,252,0.2)', filter: 'blur(48px)', borderRadius: '50%', transform: 'scale(1.5)' }} />
            <div style={{ position: 'relative', width: 96, height: 96, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(125,211,252,0.1)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 40, fontWeight: 700, color: 'var(--on-primary)' }}>check</span>
            </div>
          </div>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>Order Confirmed</h1>
            <p style={{ fontSize: 14, color: 'var(--on-surface-variant)', marginTop: 8, maxWidth: 288, margin: '8px auto 0' }}>We've received your order and are getting it ready for delivery.</p>
          </div>
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '8px 16px', borderRadius: 9999, width: 'fit-content', margin: '0 auto', border: '1px solid rgba(125,211,252,0.2)' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--on-surface-variant)' }}>Ref: #ELT-{Math.floor(Math.random() * 9000) + 1000}-XQ</span>
            <button style={{ color: 'var(--primary)', display: 'flex' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>content_copy</span>
            </button>
          </div>
        </section>

        <section className="glass-card" style={{ borderRadius: 16, padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
          <h3 style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--primary)' }}>Order Journey</h3>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ position: 'absolute', top: 16, left: 0, width: '100%', height: 2, background: 'var(--surface-variant)', zIndex: 0 }} />
            <div style={{ position: 'absolute', top: 16, left: 0, width: '33%', height: 2, background: 'linear-gradient(90deg, var(--primary) 0%, rgba(125,211,252,0.1) 100%)', zIndex: 0 }} />
            {['Confirmed', 'Processing', 'Shipped', 'Delivered'].map((step, i) => (
              <div key={step} style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: i === 0 ? 'var(--primary)' : i === 1 ? 'var(--surface-variant)' : 'var(--surface-variant)',
                  border: i === 0 ? 'none' : i === 1 ? '2px solid rgba(125,211,252,0.4)' : '1px solid rgba(74,96,112,0.3)',
                  boxShadow: i === 0 ? '0 0 15px rgba(123,209,250,0.5)' : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: i >= 2 ? 0.4 : 1,
                }}>
                  {i === 0 ? (
                    <span className="material-symbols-outlined" style={{ fontSize: 14, fontWeight: 700, color: 'var(--on-primary)' }}>check</span>
                  ) : i === 1 ? (
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)' }} className="animate-pulse" />
                  ) : null}
                </div>
                <span style={{ fontSize: 11, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? 'var(--on-surface)' : 'var(--on-surface-variant)', opacity: i >= 2 ? 0.4 : 1 }}>{step}</span>
              </div>
            ))}
          </div>
          <div style={{ background: 'rgba(14,77,110,0.1)', border: '1px solid rgba(125,211,252,0.1)', padding: 16, borderRadius: 8, display: 'flex', alignItems: 'center', gap: 16 }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>schedule</span>
            <div style={{ fontSize: 13 }}>
              <p style={{ fontWeight: 500 }}>Estimated Arrival</p>
              <p style={{ color: 'var(--on-surface-variant)' }}>Monday, Oct 24th, 2024</p>
            </div>
          </div>
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
          <div className="glass-card" style={{ borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--primary)' }}>
              <span className="material-symbols-outlined">local_shipping</span>
              <h3 style={{ fontWeight: 700, fontSize: 14 }}>Shipping Address</h3>
            </div>
            <div style={{ fontSize: 13, color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>
              <p style={{ fontWeight: 700, color: 'var(--on-surface)' }}>Julian Vance</p>
              <p>1024 Glacier Summit Drive</p>
              <p>Aspen, CO 81611</p>
              <p>United States</p>
            </div>
          </div>
          <div className="glass-card" style={{ borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--primary)' }}>
              <span className="material-symbols-outlined">credit_card</span>
              <h3 style={{ fontWeight: 700, fontSize: 14 }}>Payment Method</h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 32, background: 'var(--surface-variant)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: 8, fontWeight: 900, fontStyle: 'italic', letterSpacing: '-0.02em' }}>VISA</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--on-surface-variant)' }}>
                <p style={{ fontWeight: 700, color: 'var(--on-surface)' }}>Visa ending in 4492</p>
                <p>Billed: item total</p>
              </div>
            </div>
          </div>
        </div>

        <section className="glass-elevated" style={{ borderRadius: 16, marginTop: 16, overflow: 'hidden' }}>
          <div style={{ padding: 24, borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontWeight: 700, fontSize: 14 }}>Order Summary</h3>
            <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 14 }}>Items Ordered</span>
          </div>
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', padding: 24, display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--on-surface-variant)' }}>
            <span>Subtotal</span>
            <span>Included</span>
          </div>
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', padding: 24, display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--on-surface-variant)' }}>
            <span>Shipping (Express)</span>
            <span style={{ color: 'var(--primary)' }}>FREE</span>
          </div>
          <div style={{ background: 'rgba(20,28,46,0.5)', padding: 24, display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
            <span style={{ fontWeight: 700 }}>Total</span>
            <span style={{ fontWeight: 700, color: 'var(--primary)' }}>Charged on delivery</span>
          </div>
        </section>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '32px 0' }}>
          <button className="glass-card active:scale-[0.98]" style={{ width: '100%', height: 56, borderRadius: 9999, border: '1px solid var(--glass-border)', color: 'var(--primary)', fontWeight: 700, fontSize: 14, background: 'rgba(125,211,252,0.1)' }}>
            View Tracking Details
          </button>
          <button onClick={() => navigate('/')} style={{ width: '100%', height: 56, borderRadius: 9999, background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--on-surface-variant)', fontWeight: 500, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            Continue Shopping
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
          </button>
        </div>
      </main>
    </div>
  );
}
