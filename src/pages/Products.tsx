import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BottomBar } from '../components/BottomBar';
import { useData } from '../context/DataContext';
import { useLang } from '../context/LangContext';

type SortKey = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

export function Products() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, categories } = useData();
  const { t } = useLang();
  const activeCategory = searchParams.get('category') || '';
  const [sort, setSort] = useState<SortKey>('default');
  const [showSort, setShowSort] = useState(false);

  const filtered = useMemo(() => {
    let list = activeCategory ? products.filter((p) => p.category === activeCategory) : [...products];
    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'name-asc': list.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'name-desc': list.sort((a, b) => b.name.localeCompare(a.name)); break;
    }
    return list;
  }, [products, activeCategory, sort]);

  const sortOptions: { key: SortKey; label: string }[] = [
    { key: 'default', label: t('products.sort.default') },
    { key: 'price-asc', label: t('products.sort.price.asc') },
    { key: 'price-desc', label: t('products.sort.price.desc') },
    { key: 'name-asc', label: t('products.sort.name.asc') },
    { key: 'name-desc', label: t('products.sort.name.desc') },
  ];

  const currentSortLabel = sortOptions.find((o) => o.key === sort)?.label || t('products.sort.default');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg)' }}>
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 50,
        background: 'var(--glass-bg)', backdropFilter: 'blur(12px)',
        boxShadow: '0 1px 0 rgba(224,232,240,0.05)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 var(--pad)', height: 64, maxWidth: 'var(--container-max)', margin: '0 auto',
        }}>
          <button onClick={() => navigate(-1)} style={{ color: 'var(--on-surface)' }}>
            <span className="material-symbols-outlined">menu</span>
          </button>
          <span style={{ font: 'var(--font-headline)', letterSpacing: '0.1em', color: 'var(--on-surface)', fontWeight: 700 }}>TRIPPIE</span>
          <button onClick={() => navigate('/cart')} style={{ color: 'var(--on-surface)' }}>
            <span className="material-symbols-outlined">shopping_bag</span>
          </button>
        </div>
      </nav>

      <main style={{ paddingTop: 96, paddingBottom: 128, maxWidth: 'var(--container-max)', margin: '0 auto', paddingLeft: 'var(--pad)', paddingRight: 'var(--pad)' }}>
        <header style={{ marginBottom: 48 }}>
          <h1 style={{
            font: 'var(--font-display)',
            color: 'var(--on-surface)', marginBottom: 16,
          }}>{t('products.title')}</h1>
          <p style={{ font: 'var(--font-body-sm)', fontSize: 18, lineHeight: '28px', color: 'var(--on-surface-variant)', maxWidth: 576, opacity: 0.8 }}>
            Explore our latest collection of premium streetwear, blending urban architectural lines with soft tactile comfort.
          </p>
        </header>

        <div style={{ display: 'flex', gap: 12, overflow: 'auto', marginBottom: 40, scrollbarWidth: 'none' }}>
          {categories.map((cat) => {
            const active = activeCategory === cat.name || (!activeCategory && cat.name === 'All');
            return (
              <button key={cat.id} onClick={() => {
                if (cat.name === 'All') { setSearchParams({}); return; }
                setSearchParams({ category: cat.name });
              }}
                style={{
                  flexShrink: 0, padding: '8px 24px', borderRadius: 'var(--radius-full)',
                  background: active ? 'var(--primary)' : 'var(--surface-container)',
                  color: active ? 'var(--on-primary)' : 'var(--on-surface-variant)',
                  font: 'var(--font-label)',
                  border: active ? 'none' : '1px solid var(--glass-border)',
                }}>
                {t('categories.' + cat.name)}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <span style={{ font: 'var(--font-body)', color: 'var(--on-surface-variant)' }}>{filtered.length} {t('products.count')}</span>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowSort(!showSort)}
              style={{ display: 'flex', alignItems: 'center', gap: 4, font: 'var(--font-body)', color: 'var(--on-surface-variant)', background: 'none', padding: '4px 8px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>sort</span>
              {currentSortLabel}
            </button>
            {showSort && (
              <div style={{
                position: 'absolute', top: '100%', right: 0, zIndex: 50,
                background: 'var(--glass-bg)', backdropFilter: 'blur(12px)',
                border: '1px solid var(--glass-border)', borderRadius: 'var(--rounded-xl)',
                padding: 8, minWidth: 200,
              }}>
                {sortOptions.map((opt) => (
                  <button key={opt.key} onClick={() => { setSort(opt.key); setShowSort(false); }}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left', padding: '10px 12px',
                      borderRadius: 'var(--rounded-lg)',                 background: sort === opt.key ? 'rgba(125,211,252,0.08)' : 'transparent',
                      font: 'var(--font-body)', color: sort === opt.key ? 'var(--primary)' : 'var(--on-surface)',
                      border: 'none', fontSize: 14,
                    }}>
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--gutter)' }}>
          {filtered.map((p) => (
            <article key={p.id} onClick={() => navigate(`/product/${p.id}`)}
              style={{ cursor: 'pointer', borderRadius: 'var(--rounded-xl)', overflow: 'hidden', background: 'var(--glass-bg)', backdropFilter: 'blur(12px)', border: '1px solid var(--glass-border)' }}>
              <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: 'var(--surface-low)' }}>
                <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 16, right: 16, background: 'var(--glass-bg)', backdropFilter: 'blur(12px)', padding: 8, borderRadius: '50%', color: 'var(--on-surface)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>favorite</span>
                </div>
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <h3 style={{ font: 'var(--font-body)', color: 'var(--on-surface)', fontWeight: 500 }}>{p.name}</h3>
                  <span style={{ font: 'var(--font-label)', color: 'var(--on-surface-variant)' }}>{p.price.toLocaleString()}₴</span>
                </div>
                <p style={{ font: 'var(--font-body-sm)', color: 'var(--on-surface-variant)', opacity: 0.7 }}>{t('categories.' + p.category)}</p>
              </div>
            </article>
          ))}
        </section>
      </main>

      <BottomBar />
    </div>
  );
}