import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomBar } from '../components/BottomBar';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';
import { useLang } from '../context/LangContext';
import { Glass } from '../components/Glass';

export function Storefront() {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { products, categories, collection, offers } = useData();
  const { t } = useLang();
  const productsRef = useRef<HTMLDivElement>(null);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-background min-h-screen pb-32 overflow-x-hidden">
      <header style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 60,
        background: 'rgba(15,21,36,0.4)', backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(125,211,252,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px', height: 64,
      }}>
        <button style={{ color: 'var(--primary)', transform: 'scale(1)', transition: 'transform 0.2s' }}
          className="active:scale-90">
          <span className="material-symbols-outlined" style={{ fontSize: 28 }}>menu</span>
        </button>
        <h1 style={{ font: '800 24px/1 Inter, sans-serif', letterSpacing: '-0.03em', color: 'var(--primary)' }}>TRIPPIE</h1>
        <button onClick={() => navigate('/cart')} style={{ color: 'var(--primary)', position: 'relative', transform: 'scale(1)', transition: 'transform 0.2s' }}
          className="active:scale-90">
          <span className="material-symbols-outlined" style={{ fontSize: 28 }}>shopping_bag</span>
          {totalItems > 0 && (
            <span style={{
              position: 'absolute', top: -4, right: -4, background: 'var(--tertiary)', color: 'var(--on-tertiary)',
              fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: '50%', lineHeight: '14px',
            }}>{totalItems}</span>
          )}
        </button>
      </header>

      <main style={{ paddingTop: 64 }}>
        <section style={{ position: 'relative', width: '100%', aspectRatio: '4/5', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${collection.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a0e1a 0%, transparent 60%)', opacity: 0.9 }} />
          <div style={{ position: 'absolute', bottom: 32, left: 0, width: '100%', padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16 }}>
            <div>
              <p style={{ color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.3em', fontSize: 11, textTransform: 'uppercase', marginBottom: 4 }}>{collection.tag || 'Limited Edition'}</p>
              <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', lineHeight: 1.1 }}>
                {collection.title.split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}
              </h2>
            </div>
            <button onClick={scrollToProducts} style={{
              background: 'rgba(15,21,36,0.75)', backdropFilter: 'blur(24px)',
              border: '1px solid rgba(125,211,252,0.2)', color: '#c8eaff',
              padding: '12px 32px', borderRadius: 12, fontWeight: 600, fontSize: 13,
              letterSpacing: '0.02em', boxShadow: '0 0 30px rgba(125,211,252,0.05)',
              transform: 'scale(1)', transition: 'transform 0.2s',
            }} className="active:scale-95">
              {t('store.hero.button')}
            </button>
          </div>
        </section>

        {offers.filter((o) => o.active).length > 0 && (
          <section style={{ padding: '24px 20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {offers.filter((o) => o.active).map((offer) => (
                <div key={offer.id} style={{
                  background: 'rgba(15,21,36,0.6)', backdropFilter: 'blur(16px)',
                  borderRadius: 12, padding: 16, border: '1px solid rgba(125,211,252,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <div>
                    <p style={{ font: 'var(--font-label)', color: 'var(--primary)', marginBottom: 2 }}>{offer.title}</p>
                    <p style={{ font: 'var(--font-body-sm)', color: 'var(--on-surface-variant)' }}>{offer.description}</p>
                  </div>
                  {offer.code && (
                    <div style={{
                      padding: '6px 14px', borderRadius: 9999,
                      background: 'var(--primary-container)',
                      border: '1px solid rgba(125,211,252,0.3)',
                      font: 'var(--font-label)', color: 'var(--primary)',
                    }}>{offer.code}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <section style={{ padding: '0 20px' }}>
          <div style={{ display: 'flex', overflowX: 'auto', gap: 12, paddingBottom: 4, scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            className="hide-scrollbar">
            <button style={{
              flexShrink: 0, padding: '10px 24px', borderRadius: 9999,
              background: 'var(--primary)', color: 'var(--on-primary)',
              fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
              boxShadow: '0 0 15px rgba(123,209,250,0.3)',
            }}>{t('categories.All')}</button>
            {categories.filter((c) => c.name !== 'All').slice(0, 5).map((cat) => (
              <button key={cat.id} onClick={() => navigate(`/products?category=${encodeURIComponent(cat.name)}`)} style={{
                flexShrink: 0, padding: '10px 24px', borderRadius: 9999,
                background: 'rgba(15,21,36,0.6)', backdropFilter: 'blur(16px)',
                border: '1px solid rgba(125,211,252,0.1)',
                color: 'var(--on-surface-variant)', fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap',
              }}>{t('categories.' + cat.name)}</button>
            ))}
          </div>
        </section>

        <section style={{ paddingTop: 32 }}>
          <div style={{ padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--on-surface)' }}>{t('store.products.title')}</h3>
            <button onClick={() => navigate('/products')} style={{ color: 'var(--primary)', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', background: 'none' }}>See All</button>
          </div>
          <div style={{ display: 'flex', overflowX: 'auto', gap: 20, padding: '0 20px', paddingBottom: 8, scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            className="hide-scrollbar">
            {products.slice(0, 4).map((p) => (
              <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} style={{ minWidth: 200, cursor: 'pointer' }} className="group">
                <div style={{
                  position: 'relative', width: 200, aspectRatio: '3/4', borderRadius: 12, overflow: 'hidden',
                  background: 'rgba(15,21,36,0.6)', backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(125,211,252,0.1)',
                }}>
                  <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }}
                    className="group-hover:scale-110" />
                  <button style={{
                    position: 'absolute', top: 12, right: 12,
                    background: 'rgba(15,21,36,0.6)', backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(125,211,252,0.1)', width: 32, height: 32,
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.8)',
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>favorite</span>
                  </button>
                </div>
                <div style={{ marginTop: 12 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--on-surface)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</p>
                  <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--primary)', marginTop: 2 }}>{p.price.toLocaleString()}₴</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: '32px 20px' }}>
          <div style={{
            position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: 12, overflow: 'hidden',
            border: '1px solid rgba(125,211,252,0.2)', boxShadow: '0 0 30px rgba(125,211,252,0.05)',
          }}>
            <div style={{ position: 'absolute', inset: 0, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <img src={products[0]?.image || ''} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
            <div style={{ position: 'absolute', inset: 0, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <span style={{ color: 'var(--tertiary)', fontSize: 10, fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>Featured</span>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 12 }}>{t('store.hero.button')}</h3>
              <button style={{
                width: 'fit-content', padding: '6px 16px',
                background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.2)', borderRadius: 9999,
                fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
                color: '#fff',
              }}>{t('product.detail') || 'View Detail'}</button>
            </div>
          </div>
        </section>

        <section ref={productsRef} style={{ padding: '0 20px 32px' }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 16 }}>{t('store.products.title')}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {products.slice(0, 4).map((p, i) => (
              <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} style={{ cursor: 'pointer', marginTop: i % 2 === 1 ? 24 : 0 }}>
                <div style={{
                  position: 'relative', width: '100%', aspectRatio: '4/5', borderRadius: 12, overflow: 'hidden',
                  background: 'rgba(15,21,36,0.6)', backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(125,211,252,0.08)',
                }}>
                  <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '8px 4px' }}>
                  <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('categories.' + p.category)}</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--on-surface)', marginTop: 2 }}>{p.name}</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)', marginTop: 2 }}>{p.price.toLocaleString()}₴</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomBar />
    </div>
  );
}
