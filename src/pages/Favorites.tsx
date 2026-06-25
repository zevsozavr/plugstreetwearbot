import { useNavigate } from 'react-router-dom';
import { BottomBar } from '../components/BottomBar';
import { useData } from '../context/DataContext';
import { useFavorites } from '../context/FavoritesContext';

export function Favorites() {
  const navigate = useNavigate();
  const { products } = useData();
  const { favorites, toggleFavorite } = useFavorites();
  const favProducts = products.filter((p) => favorites.has(p.id));

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 96, overflowX: 'hidden' }}>
      <header style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 60,
        background: 'rgba(15,21,36,0.4)', backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: 64,
      }}>
        <button onClick={() => navigate(-1)} className="material-symbols-outlined" style={{ fontSize: 28, color: 'var(--primary)' }}>arrow_back</button>
        <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--primary)' }}>Wishlist</h1>
        <div style={{ width: 40 }} />
      </header>

      <main style={{ paddingTop: 96, paddingLeft: 24, paddingRight: 24 }}>
        {favProducts.length === 0 ? (
          <div style={{ paddingTop: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 24 }}>
            <div className="glass-card" style={{ width: 96, height: 96, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--on-surface-variant)', opacity: 0.3, fontVariationSettings: "'FILL' 1" }}>favorite</span>
            </div>
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 600 }}>Your wishlist is empty</h3>
              <p style={{ fontSize: 14, color: 'var(--on-surface-variant)', marginTop: 8, maxWidth: 288 }}>Save your favorite pieces and build your dream collection.</p>
            </div>
            <button onClick={() => navigate('/')} className="ice-button" style={{ padding: '14px 32px', borderRadius: 12, fontWeight: 700, fontSize: 13, color: 'var(--primary)' }}>Discover Products</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {favProducts.map((p, i) => (
              <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} style={{ cursor: 'pointer', marginTop: i % 2 === 1 ? 24 : 0 }} className="group">
                <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: 16, overflow: 'hidden' }} className="glass-card">
                  <img src={p.image} alt={p.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="group-hover:scale-110" />
                  <button onClick={(e) => { e.stopPropagation(); toggleFavorite(p); }} style={{
                    position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderRadius: '50%',
                    background: 'rgba(15,21,36,0.6)', backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(125,211,252,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--error)',
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>favorite</span>
                  </button>
                </div>
                <div style={{ padding: '8px 4px' }}>
                  <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{p.category}</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--on-surface)', marginTop: 2 }}>{p.name}</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)', marginTop: 2 }}>{p.price.toLocaleString()}₴</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomBar />
    </div>
  );
}
