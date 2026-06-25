import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LangContext';

const tg = window.Telegram?.WebApp;

export function Checkout() {
  const navigate = useNavigate();
  const { totalPrice, totalItems, items, clearCart } = useCart();
  const { t } = useLang();
  const [name, setName] = useState(tg?.initDataUnsafe.user?.first_name || '');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (tg?.BackButton) {
      tg.BackButton.show();
      const cb = () => navigate('/cart');
      tg.BackButton.onClick(cb);
      return () => tg.BackButton.offClick(cb);
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderData = { name, phone, address, items: items.map((i) => ({ id: i.id, name: i.name, size: i.selectedSize, color: i.selectedColor, quantity: i.quantity, price: i.price })), total: totalPrice };
    if (tg) { tg.sendData(JSON.stringify(orderData)); tg.HapticFeedback?.notificationOccurred('success'); }
    fetch('/api/order', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ initData: tg?.initData || '', order: orderData }) }).catch(() => {});
    clearCart();
    navigate('/order-confirmed');
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header showBack title={t('cart.checkout')} />
      <main style={{ paddingTop: 88, padding: '24px 20px', paddingBottom: 32 }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, display: 'block', marginBottom: 6, color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t('checkout.name')}</label>
            <input required value={name} onChange={(e) => setName(e.target.value)} placeholder={t('checkout.placeholder.name')}
              className="glass-card"
              style={{ width: '100%', padding: '14px 16px', borderRadius: 12, fontSize: 14, color: 'var(--on-surface)' }} />
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, display: 'block', marginBottom: 6, color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t('checkout.phone')}</label>
            <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t('checkout.placeholder.phone')}
              className="glass-card"
              style={{ width: '100%', padding: '14px 16px', borderRadius: 12, fontSize: 14, color: 'var(--on-surface)' }} />
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, display: 'block', marginBottom: 6, color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t('checkout.address')}</label>
            <input required value={address} onChange={(e) => setAddress(e.target.value)} placeholder={t('checkout.placeholder.address')}
              className="glass-card"
              style={{ width: '100%', padding: '14px 16px', borderRadius: 12, fontSize: 14, color: 'var(--on-surface)' }} />
          </div>

          <div className="glass-elevated" style={{ borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14, color: 'var(--on-surface-variant)' }}>{t('checkout.items')} ({totalItems})</span>
              <span style={{ fontSize: 14 }}>{totalPrice.toLocaleString()}₴</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14, color: 'var(--on-surface-variant)' }}>{t('checkout.delivery')}</span>
              <span style={{ color: 'var(--primary)', fontSize: 14 }}>{t('checkout.free')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 12 }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>{t('checkout.total')}</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--primary)' }}>{totalPrice.toLocaleString()}₴</span>
            </div>
          </div>

          <Button fullWidth glow type="submit">{t('checkout.submit')}</Button>
        </form>
      </main>
    </div>
  );
}
