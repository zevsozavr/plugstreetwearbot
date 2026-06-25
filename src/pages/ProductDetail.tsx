import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BottomBar } from '../components/BottomBar';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';
import { useLang } from '../context/LangContext';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { products } = useData();
  const { t } = useLang();
  const product = products.find((p) => p.id === id);

  const [size, setSize] = useState(product?.sizes[0] || '');
  const [color, setColor] = useState(product?.colors[0]?.name || '');
  const currentColorObj = product?.colors.find((c) => c.name === color);
  const displayImage = currentColorObj?.image || product?.image || '';
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div style={{ padding: 40, textAlign: 'center', background: 'var(--bg)', minHeight: '100vh' }}>
        <p style={{ marginBottom: 16, font: 'var(--font-body)', color: 'var(--on-surface-variant)' }}>{t('product.notfound')}</p>
        <button onClick={() => navigate('/')} style={{
          padding: '14px 24px', borderRadius: 'var(--rounded-lg)',
          border: '1px solid var(--glass-border)', background: 'var(--glass-bg)',
          color: 'var(--on-surface)', font: 'var(--font-label)',
        }}>{t('product.back')}</button>
      </div>
    );
  }

  const handleAdd = () => {
    addItem(product, size, color);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

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
          <span style={{ font: 'var(--font-headline)', letterSpacing: '0.1em', color: 'var(--on-surface)', fontWeight: 700 }}>TRIPPIE</span>
          <button onClick={() => navigate('/cart')} style={{ color: 'var(--on-surface)' }}>
            <span className="material-symbols-outlined">shopping_bag</span>
          </button>
        </div>
      </header>

      <main style={{ paddingTop: 64, paddingBottom: 96, maxWidth: 'var(--container-max)', margin: '0 auto', paddingLeft: 'var(--pad)', paddingRight: 'var(--pad)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48, marginTop: 32 }}>
          <div style={{ width: '100%' }}>
            <div style={{ borderRadius: 'var(--rounded-xl)', overflow: 'hidden', aspectRatio: '3/4', background: 'var(--surface-container)' }}>
              <img src={displayImage} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div>
              <span style={{ font: 'var(--font-label)', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t('categories.' + product.category)}</span>
              <h2 style={{ font: 'var(--font-headline-sm)', fontSize: 32, lineHeight: '40px', marginTop: 8, letterSpacing: '-0.01em' }}>{product.name}</h2>
              <p style={{ font: 'var(--font-headline)', color: 'var(--on-surface-variant)', marginTop: 4 }}>{product.price.toLocaleString()}₴</p>
            </div>

            <p style={{ font: 'var(--font-body)', color: 'var(--on-surface-variant)', lineHeight: 1.7 }}>{product.description}</p>

            <div>
              <h3 style={{ font: 'var(--font-label)', textTransform: 'uppercase', marginBottom: 16, opacity: 0.6 }}>Color / <span style={{ color: 'var(--on-surface)' }}>{color}</span></h3>
              <div style={{ display: 'flex', gap: 12 }}>
                {product.colors.map((c) => (
                  <button key={c.name} onClick={() => setColor(c.name)}
                    style={{
                      width: 40, height: 40, borderRadius: '50%', background: c.hex,
                      border: color === c.name ? '2px solid var(--primary)' : '1px solid var(--outline-variant)',
                    }} />
                ))}
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ font: 'var(--font-label)', textTransform: 'uppercase', opacity: 0.6 }}>{t('product.size')}</h3>
                <button style={{ font: 'var(--font-label)', color: 'var(--on-surface)', textDecoration: 'underline', background: 'none' }}>Size Guide</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {product.sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)}
                    style={{
                      padding: '12px 0', borderRadius: 'var(--rounded-lg)',
                      border: size === s ? '1px solid var(--primary)' : '1px solid var(--outline-variant)',
                      background: size === s ? 'var(--primary-container)' : 'transparent',
                      font: 'var(--font-label)', color: size === s ? 'var(--on-surface)' : 'var(--on-surface-variant)',
                    }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleAdd} style={{
              width: '100%', background: 'var(--primary)', color: 'var(--on-primary)',
              padding: '20px 0', borderRadius: 'var(--rounded-xl)',
              font: 'var(--font-label)', fontSize: 12, textTransform: 'uppercase',
              letterSpacing: '0.1em', boxShadow: '0 10px 20px rgba(125,211,252,0.15)',
            }}>
              {added ? t('product.added') : `${t('product.add')} — ${product.price.toLocaleString()}₴`}
            </button>
          </div>
        </div>
      </main>

      <BottomBar />
    </div>
  );
}