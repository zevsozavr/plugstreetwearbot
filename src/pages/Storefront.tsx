import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { useCart } from '../context/CartContext'
import { Header } from '../components/Header'
import { BottomBar } from '../components/BottomBar'
import { ProductCardHorizontal } from '../components/ProductCard'

export function Storefront() {
  const navigate = useNavigate()
  const { products, collection } = useData()
  const { addItem } = useCart()

  const newArrivals = products.slice(0, 3)
  const masonry = products

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 128 }}>
      <Header left={<div style={{ width: 28 }} />} />

      <main style={{ paddingTop: 64 }}>
        {/* Hero Section */}
        <section
          style={{
            position: 'relative',
            width: '100%',
            height: 618,
            display: 'flex',
            alignItems: 'flex-end',
            padding: '0 24px 48px',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(${collection.enabled ? collection.image : 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80'})`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, #0a0e1a, rgba(10,14,26,0.2), transparent)',
              }}
            />
          </div>
          <div style={{ position: 'relative', zIndex: 10, maxWidth: 576 }}>
            <h2 style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16, color: '#e0e8f0' }}>
              {collection.enabled ? collection.title : 'WINTER COLLECTION'}
            </h2>
            <p style={{ color: '#a0b4c4', fontSize: 18, marginBottom: 32, maxWidth: 448 }}>
              {collection.enabled ? collection.subtitle : 'Ethereal warmth engineered for the sub-zero.'}
            </p>
            <button
              onClick={() => navigate('/products')}
              style={{
                background: 'rgba(125, 211, 252, 0.2)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(125, 211, 252, 0.3)',
                color: '#7dd3fc',
                padding: '16px 32px',
                borderRadius: 9999,
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: 14,
                transition: 'all 0.2s',
              }}
              className="glow-hover"
            >
              Explore Now
            </button>
          </div>
        </section>

        {/* Category Chips */}
        <section
          style={{
            padding: '32px 24px',
            overflowX: 'auto',
            display: 'flex',
            gap: 12,
            whiteSpace: 'nowrap',
            position: 'sticky',
            top: 64,
            background: 'rgba(10,14,26,0.8)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            zIndex: 40,
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}
          className="hide-scrollbar"
        >
          {['All', 'Outerwear', 'Accessories', 'Knitwear', 'Footwear'].map((cat) => (
            <button
              key={cat}
              onClick={() => cat === 'All' ? navigate('/products') : navigate('/products')}
              style={{
                padding: '8px 24px',
                borderRadius: 9999,
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 500,
                flexShrink: 0,
                background: cat === 'All' ? '#7dd3fc' : 'rgba(15, 21, 36, 0.6)',
                backdropFilter: cat === 'All' ? 'none' : 'blur(16px)',
                color: cat === 'All' ? '#001f2e' : '#a0b4c4',
                border: cat === 'All' ? 'none' : '1px solid rgba(255,255,255,0.1)',
                boxShadow: cat === 'All' ? '0 0 15px rgba(123,209,250,0.3)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </section>

        {/* New Arrivals (Horizontal Scroll) */}
        <section style={{ paddingTop: 40, paddingBottom: 40 }}>
          <div style={{ padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', color: '#e0e8f0' }}>New Arrivals</h3>
            <button onClick={() => navigate('/products')} style={{ color: '#7dd3fc', fontSize: 14, fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
              View All
            </button>
          </div>
          <div style={{ display: 'flex', overflowX: 'auto', gap: 24, padding: '0 24px' }} className="hide-scrollbar">
            {newArrivals.map((p) => (
              <ProductCardHorizontal
                key={p.id}
                image={p.image}
                name={p.name}
                price={`$${p.price.toLocaleString()}`}
                onAddToCart={() => addItem(p, p.sizes[0], p.colors[0].name)}
              />
            ))}
          </div>
        </section>

        {/* Highlight Card */}
        <section style={{ padding: '0 24px', marginBottom: 48 }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 320,
              borderRadius: 24,
              overflow: 'hidden',
              background: 'rgba(15, 21, 36, 0.6)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(125, 211, 252, 0.2)',
            }}
            className="group"
          >
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #0a0e1a, transparent)', zIndex: 10 }} />
            <img
              src={collection.enabled ? collection.image : 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80'}
              alt="Featured"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 1s',
              }}
              className="group-hover:scale-105"
            />
            <div style={{ position: 'relative', zIndex: 20, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 40px', maxWidth: 448 }}>
              <span style={{ color: '#7dd3fc', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
                {collection.enabled ? collection.tag : 'Featured Series'}
              </span>
              <h3 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16, lineHeight: 1.2, color: '#e0e8f0' }}>
                {collection.enabled ? collection.title.toUpperCase() : 'THE ALPINE COLLECTION'}
              </h3>
              <button
                onClick={() => navigate('/products')}
                style={{
                  width: 'fit-content',
                  padding: '8px 24px',
                  borderRadius: 9999,
                  background: 'white',
                  color: 'black',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                Discover Series
              </button>
            </div>
          </div>
        </section>

        {/* Curated Selection (Masonry Grid) */}
        <section style={{ padding: '0 24px 80px' }}>
          <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32, color: '#e0e8f0' }}>Curated Selection</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'flex-start' }}>
            {/* Col 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {masonry.filter((_, i) => i % 2 === 0).map((p) => (
                <div key={p.id} className="group" onClick={() => navigate(`/product/${p.id}`)} style={{ cursor: 'pointer' }}>
                  <div
                    style={{
                      position: 'relative',
                      aspectRatio: '3/4',
                      borderRadius: 16,
                      overflow: 'hidden',
                      background: 'rgba(15, 21, 36, 0.6)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(125, 211, 252, 0.1)',
                      marginBottom: 12,
                    }}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s',
                      }}
                      className="group-hover:scale-110"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(125, 211, 252, 0.1)',
                        opacity: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'opacity 0.3s',
                      }}
                      className="group-hover:opacity-100"
                    >
                      <button
                        onClick={(e) => { e.stopPropagation(); addItem(p, p.sizes[0], p.colors[0].name) }}
                        style={{
                          padding: '8px 16px',
                          background: '#7dd3fc',
                          color: '#001f2e',
                          border: 'none',
                          borderRadius: 9999,
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: 'pointer',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                        }}
                      >
                        ADD TO BAG
                      </button>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#e0e8f0' }}>{p.name}</span>
                    <span style={{ fontSize: 14, color: '#7dd3fc' }}>${p.price.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Col 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingTop: 48 }}>
              {masonry.filter((_, i) => i % 2 === 1).map((p) => {
                const aspectRatios = ['4/5', '3/4', '1/1']
                const ar = aspectRatios[p.id.length % 3]
                return (
                  <div key={p.id} className="group" onClick={() => navigate(`/product/${p.id}`)} style={{ cursor: 'pointer' }}>
                    <div
                      style={{
                        position: 'relative',
                        aspectRatio: ar,
                        borderRadius: 16,
                        overflow: 'hidden',
                        background: 'rgba(15, 21, 36, 0.6)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(125, 211, 252, 0.1)',
                        marginBottom: 12,
                      }}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s',
                        }}
                        className="group-hover:scale-110"
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'rgba(125, 211, 252, 0.1)',
                          opacity: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'opacity 0.3s',
                        }}
                        className="group-hover:opacity-100"
                      >
                        <button
                          onClick={(e) => { e.stopPropagation(); addItem(p, p.sizes[0], p.colors[0].name) }}
                          style={{
                            padding: '8px 16px',
                            background: '#7dd3fc',
                            color: '#001f2e',
                            border: 'none',
                            borderRadius: 9999,
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                          }}
                        >
                          ADD TO BAG
                        </button>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#e0e8f0' }}>{p.name}</span>
                      <span style={{ fontSize: 14, color: '#7dd3fc' }}>${p.price.toLocaleString()}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <BottomBar />
    </div>
  )
}
