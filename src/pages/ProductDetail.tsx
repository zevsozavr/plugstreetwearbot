import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const [qty, setQty] = useState(1);
  const currentColorObj = product?.colors.find((c) => c.name === color);
  const displayImage = currentColorObj?.image || product?.image || '';
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div style={{ padding: 40, textAlign: 'center', background: 'var(--bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--on-surface-variant)', marginBottom: 16 }}>search</span>
        <p style={{ marginBottom: 16, fontSize: 14, color: 'var(--on-surface-variant)' }}>{t('product.notfound')}</p>
        <button onClick={() => navigate('/')} className="glass-card" style={{ padding: '12px 32px', borderRadius: 12, color: 'var(--on-surface)', fontSize: 12, fontWeight: 600 }}>{t('product.back')}</button>
      </div>
    );
  }

  const handleAdd = () => {
    addItem(product, size, color);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const images = [displayImage, product.image, product.image];

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 120, overflowX: 'hidden' }}>
      <header style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 60,
        background: 'rgba(15,21,36,0.4)', backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: 64,
      }}>
        <button onClick={() => navigate(-1)} className="glass-card" style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 24, color: 'var(--primary)' }}>arrow_back</span>
        </button>
        <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--primary)' }}>TRIPPIE</span>
        <button className="glass-card" style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 24, color: 'var(--primary)' }}>share</span>
        </button>
      </header>

      <main style={{ paddingTop: 64 }}>
        <section style={{ position: 'relative', width: '100%', aspectRatio: '4/5', overflow: 'hidden', background: 'var(--surface-dim)' }}>
          <div style={{ display: 'flex', height: '100%', width: '100%', overflowX: 'auto', scrollSnapType: 'x mandatory' }} className="hide-scrollbar">
            {images.map((img, i) => (
              <div key={i} style={{ flexShrink: 0, width: '100%', height: '100%', scrollSnapAlign: 'center' }}>
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
          <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
            {images.map((_, i) => (
              <div key={i} style={{
                width: i === 0 ? 24 : 8, height: 8, borderRadius: 999,
                background: i === 0 ? 'var(--primary)' : 'rgba(255,255,255,0.2)',
                transition: 'all 0.2s',
              }} />
            ))}
          </div>
        </section>

        <section style={{ padding: '0 24px', marginTop: -32, position: 'relative', zIndex: 10 }}>
          <div className="glass-elevated" style={{ borderRadius: 16, padding: 24, boxShadow: '0 0 40px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <h1 style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em' }}>{product.name.toUpperCase()}</h1>
                <p style={{ color: 'var(--on-surface-variant)', fontSize: 13, fontWeight: 500, marginTop: 4 }}>{t('categories.' + product.category)}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 24, fontWeight: 700, color: 'var(--primary)' }}>{product.price.toLocaleString()}₴</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, justifyContent: 'flex-end' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--tertiary)', fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>4.9</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <h3 style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--on-surface-variant)', marginBottom: 12 }}>Color Way</h3>
              <div style={{ display: 'flex', gap: 12 }}>
                {product.colors.map((c) => (
                  <button key={c.name} onClick={() => setColor(c.name)}
                    style={{
                      width: 32, height: 32, borderRadius: '50%', padding: 2,
                      border: color === c.name ? '2px solid var(--primary)' : '1px solid rgba(255,255,255,0.1)',
                    }}>
                    <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: c.hex }} />
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h3 style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--on-surface-variant)' }}>Select Size</h3>
                <button style={{ fontSize: 11, color: 'var(--primary)', textDecoration: 'underline', background: 'none' }}>Size Guide</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {product.sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)}
                    style={{
                      height: 48, borderRadius: 12,
                      background: size === s ? 'var(--primary)' : undefined,
                      color: size === s ? 'var(--on-primary)' : 'var(--on-surface)',
                      fontWeight: 500, fontSize: 14,
                      boxShadow: size === s ? '0 0 15px rgba(123,209,250,0.3)' : 'none',
                      border: size !== s ? '1px solid var(--glass-border)' : 'none',
                    }}
                    className={size !== s ? 'glass-card' : ''}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 32, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--on-surface-variant)' }}>Quantity</h3>
              <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '8px 16px', borderRadius: 9999 }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="material-symbols-outlined active:scale-90" style={{ fontSize: 18, color: 'var(--primary)' }}>remove</button>
                <span style={{ fontWeight: 700, width: 24, textAlign: 'center' }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="material-symbols-outlined active:scale-90" style={{ fontSize: 18, color: 'var(--primary)' }}>add</button>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <details className="glass-card" style={{ borderRadius: 12 }} open>
              <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, cursor: 'pointer', listStyle: 'none' }}>
                <span style={{ fontWeight: 600, fontSize: 13 }}>Description</span>
                <span className="material-symbols-outlined" style={{ fontSize: 18, transition: 'transform 0.2s' }}>expand_more</span>
              </summary>
              <div style={{ padding: '0 16px 16px', fontSize: 13, color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>
                {product.description}
              </div>
            </details>
            <details className="glass-card" style={{ borderRadius: 12 }}>
              <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, cursor: 'pointer', listStyle: 'none' }}>
                <span style={{ fontWeight: 600, fontSize: 13 }}>Materials</span>
                <span className="material-symbols-outlined" style={{ fontSize: 18, transition: 'transform 0.2s' }}>expand_more</span>
              </summary>
              <div style={{ padding: '0 16px 16px', fontSize: 13, color: 'var(--on-surface-variant)' }}>
                Premium materials sourced sustainably.
              </div>
            </details>
            <details className="glass-card" style={{ borderRadius: 12 }}>
              <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, cursor: 'pointer', listStyle: 'none' }}>
                <span style={{ fontWeight: 600, fontSize: 13 }}>Care Instruction</span>
                <span className="material-symbols-outlined" style={{ fontSize: 18, transition: 'transform 0.2s' }}>expand_more</span>
              </summary>
              <div style={{ padding: '0 16px 16px', fontSize: 13, color: 'var(--on-surface-variant)' }}>
                Professional clean only. Do not bleach.
              </div>
            </details>
          </div>
        </section>

        <section style={{ marginTop: 48, marginBottom: 80 }}>
          <div style={{ padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>THE ECOSYSTEM</h2>
              <p style={{ fontSize: 10, color: 'var(--tertiary)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Complete the kit</p>
            </div>
            <button style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600, background: 'none' }}>See all</button>
          </div>
          <div style={{ display: 'flex', overflowX: 'auto', gap: 16, padding: '0 24px' }} className="hide-scrollbar">
            {products.slice(0, 4).map((p) => (
              <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} style={{ minWidth: 200, cursor: 'pointer' }} className="group">
                <div style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 12, overflow: 'hidden', marginBottom: 12 }} className="glass-card">
                  <img src={p.image} alt={p.name} loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                    className="group-hover:scale-110" />
                </div>
                <h4 style={{ fontSize: 12, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</h4>
                <p style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 700, marginTop: 4 }}>{p.price.toLocaleString()}₴</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', zIndex: 60, padding: 24, background: 'linear-gradient(to top, #0a0e1a 0%, rgba(10,14,26,0.8) 100%)' }}>
        <div className="glass-elevated" style={{ borderRadius: 16, padding: 16, display: 'flex', gap: 16, alignItems: 'center', boxShadow: '0 0 40px rgba(0,0,0,0.5)' }}>
          <button className="glass-card" style={{ width: 56, height: 56, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 24, color: 'var(--on-surface-variant)' }}>favorite</span>
          </button>
          <button onClick={handleAdd} style={{
            flex: 1, height: 56, background: 'var(--primary)', color: 'var(--on-primary)',
            borderRadius: 12, fontWeight: 700, fontSize: 14, letterSpacing: '-0.01em',
            boxShadow: '0 0 20px rgba(125,211,252,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'all 0.2s', border: 'none',
          }} className="active:scale-[0.98] glow-hover">
            {added ? (
              <><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: 20 }}>check</span> Added</>
            ) : (
              <><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: 20 }}>local_mall</span> Add to Bag</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
