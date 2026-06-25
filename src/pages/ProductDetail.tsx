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
  const [showDesc, setShowDesc] = useState(true);

  if (!product) {
    return (
      <div style={{ padding: 40, textAlign: 'center', background: 'var(--bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--on-surface-variant)', marginBottom: 16 }}>search</span>
        <p style={{ marginBottom: 16, font: 'var(--font-body)', color: 'var(--on-surface-variant)' }}>{t('product.notfound')}</p>
        <button onClick={() => navigate('/')} style={{
          padding: '12px 32px', borderRadius: 12,
          border: '1px solid rgba(125,211,252,0.1)', background: 'rgba(15,21,36,0.6)',
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
        <span style={{ font: '800 22px/1 Inter, sans-serif', letterSpacing: '-0.03em', color: 'var(--primary)' }}>TRIPPIE</span>
        <button style={{ color: 'var(--primary)' }} className="active:scale-90">
          <span className="material-symbols-outlined" style={{ fontSize: 28 }}>share</span>
        </button>
      </header>

      <main style={{ paddingTop: 64 }}>
        <div style={{ width: '100%', aspectRatio: '4/5', overflow: 'hidden', borderRadius: 0 }}>
          <img src={displayImage} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{t('categories.' + product.category)}</p>
                <h2 style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em' }}>{product.name}</h2>
              </div>
              <p style={{ fontSize: 22, fontWeight: 700, color: 'var(--primary)' }}>{product.price.toLocaleString()}₴</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
              {[1,2,3,4,5].map((s) => (
                <span key={s} className="material-symbols-outlined" style={{
                  fontSize: 16, color: 'var(--primary)',
                  fontVariationSettings: `'FILL' ${s <= 4 ? 1 : 0}, 'wght' 300`,
                }}>star</span>
              ))}
              <span style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginLeft: 4 }}>12 {t('product.reviews') || 'reviews'}</span>
            </div>
          </div>

          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--on-surface-variant)' }}>{product.description}</p>

          <div>
            <h3 style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12, color: 'var(--on-surface-variant)' }}>{t('product.color') || 'Color'} / <span style={{ color: 'var(--on-surface)' }}>{color}</span></h3>
            <div style={{ display: 'flex', gap: 12 }}>
              {product.colors.map((c) => (
                <button key={c.name} onClick={() => setColor(c.name)}
                  style={{
                    width: 36, height: 36, borderRadius: '50%', background: c.hex,
                    border: color === c.name ? '2px solid var(--primary)' : '1px solid var(--outline-variant)',
                    boxShadow: color === c.name ? '0 0 10px rgba(125,211,252,0.3)' : 'none',
                    transition: 'all 0.2s',
                  }} />
              ))}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3 style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--on-surface-variant)' }}>{t('product.size')}</h3>
              <button style={{ fontSize: 11, color: 'var(--primary)', textDecoration: 'underline', background: 'none' }}>{t('product.sizeguide') || 'Size Guide'}</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {product.sizes.map((s) => (
                <button key={s} onClick={() => setSize(s)}
                  style={{
                    padding: '12px 0', borderRadius: 12,
                    border: size === s ? '1px solid var(--primary)' : '1px solid var(--outline-variant)',
                    background: size === s ? 'rgba(125,211,252,0.08)' : 'transparent',
                    fontSize: 13, fontWeight: 500,
                    color: size === s ? 'var(--primary)' : 'var(--on-surface-variant)',
                    transition: 'all 0.2s',
                  }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(125,211,252,0.1)', paddingTop: 16 }}>
            <button onClick={() => setShowDesc(!showDesc)} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%',
              background: 'none', padding: '8px 0',
            }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--on-surface)' }}>{t('product.description') || 'Description'}</span>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--on-surface-variant)', transform: showDesc ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>expand_more</span>
            </button>
            {showDesc && (
              <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--on-surface-variant)', paddingBottom: 16 }}>{product.description}</p>
            )}
          </div>

          <button onClick={handleAdd} style={{
            width: '100%', background: 'var(--primary)', color: 'var(--on-primary)',
            padding: '18px 0', borderRadius: 12,
            fontWeight: 600, fontSize: 13, textTransform: 'uppercase',
            letterSpacing: '0.05em',
            transition: 'all 0.2s', border: 'none',
            boxShadow: '0 0 30px rgba(125,211,252,0.05)',
          }} className="active:scale-95">
            {added ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, fontVariationSettings: "'FILL' 1" }}>check</span>
                {t('product.added')}
              </span>
            ) : `${t('product.add')} — ${product.price.toLocaleString()}₴`}
          </button>
        </div>
      </main>

      <BottomBar />
    </div>
  );
}
