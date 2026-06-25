import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { BottomBar } from '../components/BottomBar'

export function OrderConfirmed() {
  const navigate = useNavigate()
  const { items, totalPrice } = useCart()

  return (
    <div style={{ background: '#0a0e1a', minHeight: '100vh', paddingBottom: 128 }}>
      {/* Top App Bar */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
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
        <button style={{ color: '#7dd3fc', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h1 style={{ fontFamily: 'Inter', fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', color: '#7dd3fc' }}>ELITE</h1>
        <button style={{ color: '#7dd3fc', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <span className="material-symbols-outlined">shopping_bag</span>
        </button>
      </header>

      <main
        style={{
          position: 'relative',
          zIndex: 10,
          paddingTop: 96,
          paddingBottom: 128,
          paddingLeft: 24,
          paddingRight: 24,
          maxWidth: 512,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Success Header */}
        <div style={{ marginBottom: 40, textAlign: 'center' }}>
          <div
            className="success-glow"
            style={{
              width: 80,
              height: 80,
              background: 'rgba(125, 211, 252, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
              margin: '0 auto 24px',
              border: '1px solid rgba(125, 211, 252, 0.2)',
            }}
          >
            <span className="material-symbols-outlined" style={{ color: '#7dd3fc', fontSize: 48, fontVariationSettings: "'wght' 200" }}>
              check_circle
            </span>
          </div>
          <h2 style={{ color: '#7dd3fc', fontWeight: 700, fontSize: 24, letterSpacing: '0.2em', marginBottom: 8 }}>
            ORDER CONFIRMED
          </h2>
          <p style={{ color: '#a0b4c4', fontWeight: 300, fontSize: 14, maxWidth: 280, margin: '0 auto', lineHeight: 1.5 }}>
            Your luxury pieces are being prepared with artisanal care.
          </p>
        </div>

        {/* Order ID Card */}
        <div
          className="glass-card"
          style={{
            width: '100%',
            borderRadius: 24,
            padding: 20,
            marginBottom: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <p style={{ fontSize: 10, color: '#a0b4c4', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
              Order Reference
            </p>
            <p style={{ color: '#e0e8f0', fontWeight: 600, letterSpacing: '-0.02em' }}>#EL-{Math.floor(10000 + Math.random() * 90000)}</p>
          </div>
          <button
            style={{
              width: 40,
              height: 40,
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
              color: '#7dd3fc',
            }}
            onClick={(e) => {
              const icon = e.currentTarget.querySelector('.material-symbols-outlined')
              if (icon) {
                icon.textContent = 'check'
                setTimeout(() => { icon.textContent = 'content_copy' }, 2000)
              }
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>content_copy</span>
          </button>
        </div>

        {/* Status Timeline */}
        <div className="glass-card" style={{ width: '100%', borderRadius: 24, padding: 24, marginBottom: 24 }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#a0b4c4', marginBottom: 24 }}>
            Tracking Status
          </h3>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            {/* Timeline Line */}
            <div style={{ position: 'absolute', top: 16, left: 0, width: '100%', height: 1, background: 'rgba(255,255,255,0.1)', zIndex: 0 }} />
            <div style={{ position: 'absolute', top: 16, left: 0, width: '15%', height: 1, background: '#7dd3fc', zIndex: 0 }} />
            {[
              { label: 'Confirmed', active: true },
              { label: 'Processing', active: false },
              { label: 'Shipped', active: false },
              { label: 'Delivered', active: false },
            ].map((step, i) => (
              <div key={i} style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                {step.active ? (
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: '#7dd3fc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#001f2e',
                      boxShadow: '0 0 15px rgba(125,211,252,0.4)',
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 14, fontVariationSettings: "'FILL' 1" }}>check</span>
                  </div>
                ) : (
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: '#202c42',
                      border: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#a0b4c4',
                    }}
                  >
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
                  </div>
                )}
                <span style={{ fontSize: 10, fontWeight: step.active ? 600 : 500, color: step.active ? '#7dd3fc' : '#a0b4c4', textAlign: 'center' }}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        {items.slice(0, 1).map((item) => (
          <div key={item.id} className="glass-card" style={{ width: '100%', borderRadius: 24, padding: 24, marginBottom: 24 }}>
            <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#a0b4c4', marginBottom: 20 }}>
              Order Summary
            </h3>
            <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.1)',
                  flexShrink: 0,
                  background: '#202c42',
                }}
              >
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, color: '#e0e8f0' }}>{item.name}</h4>
                <p style={{ fontSize: 12, color: '#a0b4c4', marginTop: 4 }}>
                  {item.selectedColor} • Qty {item.quantity}
                </p>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#7dd3fc', marginTop: 8 }}>
                  ${(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
            <div style={{ paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: '#a0b4c4' }}>Estimated Arrival</span>
                <span style={{ fontSize: 12, fontWeight: 500, color: '#e0e8f0' }}>
                  {new Date(Date.now() + 3 * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(Date.now() + 5 * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: '#a0b4c4' }}>Shipping</span>
                <span style={{ fontSize: 12, fontWeight: 500, color: '#c8a0f0' }}>Complimentary</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#e0e8f0' }}>Total</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: '#7dd3fc' }}>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Shipping & Payment Info Bento */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, width: '100%', marginBottom: 40 }}>
          <div className="glass-card" style={{ borderRadius: 24, padding: 20, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <span className="material-symbols-outlined" style={{ color: '#7dd3fc' }}>local_shipping</span>
            </div>
            <div>
              <h4 style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#a0b4c4', marginBottom: 4 }}>
                Shipping Address
              </h4>
              <p style={{ fontSize: 14, lineHeight: 1.5, color: '#e0e8f0' }}>
                1245 Arctic Circle,<br />North Pole, Earth
              </p>
            </div>
          </div>
          <div className="glass-card" style={{ borderRadius: 24, padding: 20, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <span className="material-symbols-outlined" style={{ color: '#7dd3fc' }}>account_balance_wallet</span>
            </div>
            <div>
              <h4 style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#a0b4c4', marginBottom: 4 }}>
                Payment Method
              </h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#e0e8f0' }}>Telegram Pay</span>
                <span style={{ fontSize: 10, color: '#a0b4c4', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)' }}>
                  Visa ****4242
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main CTA */}
        <button
          onClick={() => navigate('/')}
          style={{
            width: '100%',
            height: 64,
            borderRadius: 9999,
            background: 'rgba(125, 211, 252, 0.2)',
            border: '1px solid rgba(125, 211, 252, 0.4)',
            color: '#7dd3fc',
            fontWeight: 700,
            letterSpacing: '0.1em',
            fontSize: 14,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            boxShadow: '0 0 20px rgba(125,211,252,0.1)',
          }}
        >
          CONTINUE SHOPPING
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
        </button>
      </main>

      <BottomBar />
    </div>
  )
}
