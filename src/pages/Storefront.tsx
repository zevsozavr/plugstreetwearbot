import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomBar } from '../components/BottomBar';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';
import { useLang } from '../context/LangContext';

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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg)' }}>
      <header style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 50,
        background: 'var(--glass-bg)', backdropFilter: 'blur(12px)',
        boxShadow: '0 1px 0 rgba(224,232,240,0.05)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 var(--pad)', height: 64, maxWidth: 'var(--container-max)',
          margin: '0 auto',
        }}>
          <button style={{ color: 'var(--on-surface)' }}><span className="material-symbols-outlined">menu</span></button>
          <span style={{ font: 'var(--font-headline)', letterSpacing: '0.1em', color: 'var(--on-surface)', fontWeight: 700 }}>TRIPPIE</span>
          <button onClick={() => navigate('/cart')} style={{ color: 'var(--on-surface)', position: 'relative' }}>
            <span className="material-symbols-outlined">shopping_bag</span>
            {totalItems > 0 && <span style={{ position: 'absolute', top: -4, right: -4, width: 16, height: 16, borderRadius: '50%', background: 'var(--primary)', color: 'var(--on-primary)', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{totalItems}</span>}
          </button>
        </div>
      </header>

      <main style={{ flex: 1, paddingBottom: 96 }}>
        <section style={{ position: 'relative', width: '100%', height: 751, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <div style={{
              width: '100%', height: '100%', backgroundImage: `url(${collection.image})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
            }} />
          </div>
          <div className="tonal-gradient" style={{ position: 'absolute', inset: 0 }} />
          <div style={{
            position: 'relative', zIndex: 10, height: '100%',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            padding: '0 var(--pad)', paddingBottom: 64, maxWidth: 'var(--container-max)', margin: '0 auto',
          }}>
            <div style={{ maxWidth: 576 }}>
              <h1 style={{
                font: 'var(--font-display)',
                color: 'var(--primary)', marginBottom: 16, lineHeight: 1.1,
              }}>
                {collection.title.split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}
              </h1>
              <p style={{
                font: 'var(--font-body-sm)', fontSize: 18, lineHeight: '28px',
                color: 'var(--on-surface-variant)', marginBottom: 32, maxWidth: 448,
              }}>{collection.subtitle}</p>
              <div style={{ display: 'flex', gap: 16 }}>
                <button onClick={scrollToProducts} style={{
                  background: 'var(--primary)', color: 'var(--on-primary)',
                  padding: '16px 32px', borderRadius: 'var(--rounded-lg)',
                  font: 'var(--font-label)', fontSize: 12,
                  boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                }}>{t('store.hero.button')}</button>
                <button style={{
                  border: '1px solid var(--glass-border)', color: 'var(--on-surface)',
                  padding: '16px 32px', borderRadius: 'var(--rounded-lg)',
                  font: 'var(--font-label)', fontSize: 12,
                }}>VIEW EDITORIAL</button>
              </div>
            </div>
          </div>
        </section>

        {offers.filter((o) => o.active).length > 0 && (
          <section style={{ padding: '24px var(--pad)', maxWidth: 'var(--container-max)', margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {offers.filter((o) => o.active).map((offer) => (
                <div key={offer.id} style={{
                  background: 'var(--glass-bg)', backdropFilter: 'blur(12px)',
                    borderRadius: 'var(--rounded-xl)', padding: 16, border: '1px solid var(--glass-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <div>
                    <p style={{ font: 'var(--font-label)', color: 'var(--primary)', marginBottom: 2 }}>{offer.title}</p>
                    <p style={{ font: 'var(--font-body-sm)', color: 'var(--on-surface-variant)' }}>{offer.description}</p>
                  </div>
                  {offer.code && <div style={{ padding: '6px 14px', borderRadius: 'var(--radius-full)', background: 'var(--primary-container)', border: '1px solid rgba(125,211,252,0.3)', font: 'var(--font-label)', color: 'var(--primary)' }}>{offer.code}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        <section style={{ padding: '80px 0', overflow: 'hidden' }}>
          <div style={{
            padding: '0 var(--pad)', maxWidth: 'var(--container-max)', margin: '0 auto',
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40,
          }}>
            <div>
              <h2 style={{ font: 'var(--font-headline-sm)', fontSize: 32, lineHeight: '40px', color: 'var(--on-surface)' }}>{t('store.categories.title')}</h2>
              <p style={{ font: 'var(--font-body)', color: 'var(--on-surface-variant)' }}>{t('store.products.title')}</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ padding: 8, border: '1px solid var(--glass-border)', borderRadius: '50%', color: 'var(--on-surface)' }}><span className="material-symbols-outlined">chevron_left</span></button>
                <button style={{ padding: 8, border: '1px solid var(--glass-border)', borderRadius: '50%', color: 'var(--on-surface)' }}><span className="material-symbols-outlined">chevron_right</span></button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 24, overflow: 'auto', padding: '0 var(--pad)', scrollbarWidth: 'none' }}>
            {categories.filter((c) => c.name !== 'All').slice(0, 6).map((cat) => (
              <div key={cat.id} onClick={() => navigate(`/products?category=${encodeURIComponent(cat.name)}`)} style={{
                flexShrink: 0, width: 320, cursor: 'pointer',
              }}>
                <div style={{
                  position: 'relative', borderRadius: 'var(--rounded-xl)', overflow: 'hidden',
                  aspectRatio: '3/4', marginBottom: 16, background: 'var(--surface-container)',
                }}>
                  <img src={cat.image || 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80'} alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute', bottom: 24, left: 24,
                  }}>
                    <span style={{
                      background: 'var(--glass-bg)', backdropFilter: 'blur(12px)',
                      padding: '4px 12px', borderRadius: 'var(--radius-full)',
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                      color: 'var(--on-surface)', display: 'inline-block', marginBottom: 8,
                    }}>{cat.name.toUpperCase()}</span>
                    <h3 style={{ font: 'var(--font-headline)', color: '#fff' }}>{t('categories.' + cat.name)}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section ref={productsRef} style={{ padding: '80px var(--pad)', maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ font: 'var(--font-headline-sm)', fontSize: 32, lineHeight: '40px', color: 'var(--on-surface)' }}>{t('store.products.title')}</h2>
            <div style={{ width: 48, height: 4, background: 'var(--primary)', marginTop: 8 }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
            {products.slice(0, 5).map((p, i) => (
              <article key={p.id} onClick={() => navigate(`/product/${p.id}`)} style={{ cursor: 'pointer' }}>
                <div style={{
                  position: 'relative', borderRadius: 'var(--rounded-xl)', overflow: 'hidden',
                  background: 'var(--surface-container)',
                  minHeight: i === 0 ? 400 : 320,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <img src={p.image} alt={p.name} style={{
                    width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0,
                  }} />
                  <div style={{
                    position: 'absolute', bottom: 32, left: 32, right: 32,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                  }}>
                    <div style={{
                      background: 'var(--glass-card-bg)', backdropFilter: 'blur(24px)',
                      borderRadius: 'var(--rounded-lg)', padding: 16, width: '100%',
                    }}>
                      <p style={{ font: 'var(--font-label)', color: 'var(--on-surface)', fontSize: 11, letterSpacing: '0.05em' }}>{t('categories.' + p.category)}</p>
                      <p style={{ font: 'var(--font-label)', color: 'var(--on-surface)', marginTop: 4, fontSize: 12 }}>{p.name}</p>
                      <p style={{ font: 'var(--font-body)', color: 'var(--on-surface-variant)', fontSize: 14 }}>{p.price.toLocaleString()}₴</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div style={{ marginTop: 48, textAlign: 'center' }}>
            <button onClick={() => navigate('/products')} style={{
              font: 'var(--font-label)', color: 'var(--on-surface)',
              borderBottom: '2px solid var(--primary)', paddingBottom: 8, background: 'none',
            }}>
              VIEW ALL NEW ARRIVALS
            </button>
          </div>
        </section>

        <section style={{ padding: '96px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden', minHeight: 384, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'relative', zIndex: 10 }}>
            <h2 style={{
              font: 'var(--font-display)', fontStyle: 'italic', opacity: 0.5,
              marginBottom: 16, letterSpacing: '-0.02em',
            }}>THE CALM IN THE CLAMOR.</h2>
            <p style={{ font: 'var(--font-label)', letterSpacing: '0.4em', color: 'var(--on-surface-variant)' }}>ESTABLISHED IN THE URBAN CORE</p>
          </div>
        </section>
      </main>

      <BottomBar />
    </div>
  );
}