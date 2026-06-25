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

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 128 }}>
      <header style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 60,
        background: 'rgba(15,21,36,0.4)', backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: 64,
      }}>
        <button style={{ color: 'var(--primary)' }} className="active:scale-90">
          <span className="material-symbols-outlined" style={{ fontSize: 28 }}>menu</span>
        </button>
        <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--primary)' }}>TRIPPIE</h1>
        <button onClick={() => navigate('/cart')} style={{ color: 'var(--primary)', position: 'relative' }} className="active:scale-90">
          <span className="material-symbols-outlined" style={{ fontSize: 28 }}>shopping_bag</span>
          {totalItems > 0 && (
            <span style={{
              position: 'absolute', top: -4, right: -4,
              background: 'var(--tertiary)', color: 'var(--on-tertiary)',
              fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: '50%', lineHeight: '14px',
            }}>{totalItems}</span>
          )}
        </button>
      </header>

      <main style={{ paddingTop: 64 }}>
        <section style={{ position: 'relative', width: '100%', height: 500, display: 'flex', alignItems: 'flex-end', padding: '0 24px 48px', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <div style={{ width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url(${collection.image})` }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a0e1a 0%, rgba(10,14,26,0.2) 60%, transparent 100%)' }} />
          </div>
          <div style={{ position: 'relative', zIndex: 10, maxWidth: 576 }}>
            <h2 style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16, color: 'var(--on-surface)' }}>
              {collection.title.split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}
            </h2>
            <p style={{ color: 'var(--on-surface-variant)', fontSize: 18, marginBottom: 32, maxWidth: 448 }}>{collection.subtitle}</p>
            <button className="glow-hover active:scale-95" style={{
              background: 'rgba(125,211,252,0.2)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(125,211,252,0.3)', color: 'var(--primary)',
              padding: '16px 32px', borderRadius: 9999, fontWeight: 600, fontSize: 14,
              transition: 'all 0.2s',
            }}>
              Explore Now
            </button>
          </div>
        </section>

        {offers.filter((o) => o.active).length > 0 && (
          <section style={{ padding: '24px 24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {offers.filter((o) => o.active).map((offer) => (
                <div key={offer.id} className="glass-card" style={{ borderRadius: 12, padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 12, color: 'var(--primary)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{offer.title}</p>
                    <p style={{ fontSize: 14, color: 'var(--on-surface-variant)' }}>{offer.description}</p>
                  </div>
                  {offer.code && (
                    <div style={{
                      padding: '6px 14px', borderRadius: 9999,
                      background: 'var(--primary-container)',
                      border: '1px solid rgba(125,211,252,0.3)',
                      fontSize: 12, fontWeight: 600, color: 'var(--primary)',
                    }}>{offer.code}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <section style={{ padding: '32px 24px', overflowX: 'auto' }} className="hide-scrollbar">
          <div style={{ display: 'flex', gap: 12, whiteSpace: 'nowrap' }}>
            <button style={{
              flexShrink: 0, padding: '10px 24px', borderRadius: 9999,
              background: 'var(--primary)', color: 'var(--on-primary)',
              fontSize: 12, fontWeight: 600,
              boxShadow: '0 0 15px rgba(123,209,250,0.3)',
            }}>{t('categories.All')}</button>
            {categories.filter((c) => c.name !== 'All').slice(0, 5).map((cat) => (
              <button key={cat.id} onClick={() => navigate(`/products?category=${encodeURIComponent(cat.name)}`)} style={{
                flexShrink: 0, padding: '10px 24px', borderRadius: 9999,
                fontSize: 12, fontWeight: 500, color: 'var(--on-surface-variant)',
                whiteSpace: 'nowrap',
              }} className="glass-card">
                {t('categories.' + cat.name)}
              </button>
            ))}
          </div>
        </section>

        <section style={{ padding: '0 24px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>New Arrivals</h3>
            <button onClick={() => navigate('/products')} style={{ color: 'var(--primary)', fontSize: 12, fontWeight: 600, background: 'none' }}>View All</button>
          </div>
          <div style={{ display: 'flex', overflowX: 'auto', gap: 24 }} className="hide-scrollbar">
            {products.slice(0, 4).map((p) => (
              <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} style={{ minWidth: 280, cursor: 'pointer' }} className="group">
                <div style={{ position: 'relative', height: 380, borderRadius: 16, overflow: 'hidden', marginBottom: 16 }} className="glass-card">
                  <img src={p.image} alt={p.name} loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }}
                    className="group-hover:scale-110" />
                </div>
                <p style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</p>
                <p style={{ color: 'var(--on-surface-variant)', fontSize: 12 }}>{p.price.toLocaleString()}₴</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: '0 24px 48px' }}>
          <div style={{
            position: 'relative', width: '100%', height: 320, borderRadius: 24, overflow: 'hidden',
            borderColor: 'rgba(125,211,252,0.2)',
          }} className="glass-card group">
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #0a0e1a 0%, transparent 60%)', zIndex: 10 }} />
            <img src={products[0]?.image || ''} alt=""
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1s' }}
              className="group-hover:scale-105" />
            <div style={{ position: 'relative', zIndex: 20, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 40px', maxWidth: 448 }}>
              <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 8 }}>Featured Series</span>
              <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16, lineHeight: 1.2 }}>THE ALPINE COLLECTION</h3>
              <button style={{
                width: 'fit-content', padding: '10px 24px', borderRadius: 9999,
                background: '#fff', color: '#000', fontWeight: 600, fontSize: 12,
              }} className="hover:bg-primary transition-colors">Discover Series</button>
            </div>
          </div>
        </section>

        <section style={{ padding: '0 24px 80px' }}>
          <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32 }}>Curated Selection</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {products.filter((_, i) => i % 2 === 0).slice(0, 2).map((p) => (
                <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} style={{ cursor: 'pointer' }} className="group">
                  <div style={{ position: 'relative', aspectRatio: '3/4', borderRadius: 16, overflow: 'hidden', marginBottom: 12 }} className="glass-card">
                    <img src={p.image} alt={p.name} loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                      className="group-hover:scale-110" />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>{p.name}</span>
                    <span style={{ fontSize: 12, color: 'var(--primary)' }}>{p.price.toLocaleString()}₴</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingTop: 48 }}>
              {products.filter((_, i) => i % 2 === 1).slice(0, 2).map((p) => (
                <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} style={{ cursor: 'pointer' }} className="group">
                  <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: 16, overflow: 'hidden', marginBottom: 12 }} className="glass-card">
                    <img src={p.image} alt={p.name} loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                      className="group-hover:scale-110" />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>{p.name}</span>
                    <span style={{ fontSize: 12, color: 'var(--primary)' }}>{p.price.toLocaleString()}₴</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <BottomBar />
    </div>
  );
}
