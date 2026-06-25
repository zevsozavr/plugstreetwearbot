import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useLang } from '../context/LangContext'
import { useData } from '../context/DataContext'

export function Checkout() {
  const navigate = useNavigate()
  const { items, totalPrice, clearCart } = useCart()
  const { t } = useLang()
  const { offers } = useData()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const activeOffers = offers.filter((o) => o.active)
  const subtotal = totalPrice
  const shipping = subtotal >= 20000 ? 0 : 500
  const total = subtotal + shipping

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const tg = window.Telegram?.WebApp
      if (tg?.initDataUnsafe?.user?.id) {
        const msg = [
          `🛒 *Нове замовлення!*`,
          `👤 *${name}*`,
          `📞 ${phone}`,
          `📍 ${address}`,
          '',
          ...items.map((i) => `• ${i.name} (${i.selectedSize}, ${i.selectedColor}) x${i.quantity} — $${(i.price * i.quantity).toLocaleString()}`),
          '',
          `💰 *Всього: $${total.toLocaleString()}*`,
        ].join('\n')

        await fetch(`https://api.telegram.org/bot${import.meta.env.VITE_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: 822479618,
            text: msg,
            parse_mode: 'Markdown',
          }),
        })
      }
    } catch {}

    clearCart()
    navigate('/order-confirmed')
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Top App Bar */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 50,
          background: 'rgba(15, 21, 36, 0.4)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 24px',
          height: 64,
        }}
      >
        <button onClick={() => navigate('/cart')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#7dd3fc', display: 'flex' }}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 style={{ fontFamily: 'Inter', color: '#e0e8f0', fontWeight: 600, fontSize: 18 }}>Checkout</h1>
        <div style={{ width: 24 }} />
      </header>

      <main style={{ paddingTop: 80, paddingLeft: 16, paddingRight: 16, paddingBottom: 120 }}>
        <form onSubmit={handleSubmit}>
          {/* Contact Info */}
          <section
            style={{
              background: 'rgba(15, 21, 36, 0.6)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(125, 211, 252, 0.1)',
              borderRadius: 24,
              padding: 24,
              marginBottom: 16,
            }}
          >
            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#e0e8f0', marginBottom: 16 }}>Contact Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('checkout.placeholder.name')}
                required
                style={{
                  width: '100%',
                  height: 48,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 16,
                  padding: '0 16px',
                  color: '#e0e8f0',
                  fontSize: 14,
                  outline: 'none',
                }}
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t('checkout.placeholder.phone')}
                required
                style={{
                  width: '100%',
                  height: 48,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 16,
                  padding: '0 16px',
                  color: '#e0e8f0',
                  fontSize: 14,
                  outline: 'none',
                }}
              />
            </div>
          </section>

          {/* Delivery */}
          <section
            style={{
              background: 'rgba(15, 21, 36, 0.6)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(125, 211, 252, 0.1)',
              borderRadius: 24,
              padding: 24,
              marginBottom: 16,
            }}
          >
            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#e0e8f0', marginBottom: 16 }}>Delivery</h3>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={t('checkout.placeholder.address')}
              required
              rows={3}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 16,
                padding: 12,
                color: '#e0e8f0',
                fontSize: 14,
                outline: 'none',
                resize: 'vertical',
              }}
            />
          </section>

          {/* Order Summary */}
          <section
            style={{
              background: 'rgba(15, 21, 36, 0.75)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(125, 211, 252, 0.15)',
              borderRadius: 24,
              padding: 24,
              marginBottom: 24,
            }}
          >
            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#e0e8f0', marginBottom: 16 }}>Order Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {items.map((item) => (
                <div key={item.id + item.selectedSize + item.selectedColor} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14 }}>
                  <span style={{ color: '#a0b4c4' }}>
                    {item.name} x{item.quantity}
                  </span>
                  <span style={{ color: '#e0e8f0', fontWeight: 500 }}>${(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            {activeOffers.length > 0 && (
              <div style={{ marginTop: 12, padding: 12, background: 'rgba(200, 160, 240, 0.1)', borderRadius: 16 }}>
                <p style={{ color: '#c8a0f0', fontSize: 12, fontWeight: 600 }}>Active promos: {activeOffers.map((o) => o.code).join(', ')}</p>
              </div>
            )}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', marginTop: 16, marginBottom: 12 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
              <span style={{ color: '#a0b4c4' }}>Subtotal</span>
              <span style={{ color: '#e0e8f0' }}>${subtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
              <span style={{ color: '#a0b4c4' }}>Shipping</span>
              <span style={{ color: shipping === 0 ? '#7dd3fc' : '#e0e8f0', fontWeight: 500 }}>
                {shipping === 0 ? 'Free' : `$${shipping.toLocaleString()}`}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 700 }}>
              <span style={{ color: '#e0e8f0' }}>Total</span>
              <span style={{ color: '#7dd3fc' }}>${total.toLocaleString()}</span>
            </div>
          </section>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            style={{
              width: '100%',
              height: 56,
              background: '#7dd3fc',
              color: '#001f2e',
              border: 'none',
              borderRadius: 24,
              fontWeight: 700,
              fontSize: 16,
              cursor: submitting ? 'not-allowed' : 'pointer',
              opacity: submitting ? 0.7 : 1,
              boxShadow: '0 0 20px rgba(125,211,252,0.3)',
            }}
          >
            {submitting ? 'Processing...' : 'Place Order'}
          </button>
        </form>
      </main>
    </div>
  )
}
