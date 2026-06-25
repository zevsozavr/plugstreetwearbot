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
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 96, overflowX: 'hidden' }}>
      <header style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 60,
        background: 'rgba(15,21,36,0.4)', backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: 64,
      }}>
        <button onClick={() => navigate(-1)} style={{ color: 'var(--primary)' }} className="active:scale-90">
          <span className="material-symbols-outlined" style={{ fontSize: 28 }}>arrow_back</span>
        </button>
        <h1 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--primary)' }}>{t('products.title')}</h1>
        <div style={{ width: 40 }} />
      </header>

      <main style={{ paddingTop: 80, paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', marginBottom: 24, paddingBottom: 4 }} className="hide-scrollbar">
          {categories.map((cat) => {
            const active = activeCategory === cat.name || (!activeCategory && cat.name === 'All');
            return (
              <button key={cat.id} onClick={() => {
                if (cat.name === 'All') { setSearchParams({}); return; }
                setSearchParams({ category: cat.name });
              }}
                style={{
                  flexShrink: 0, padding: '10px 24px', borderRadius: 9999,
                  background: active ? 'var(--primary)' : undefined,
                  color: active ? 'var(--on-primary)' : 'var(--on-surface-variant)',
                  fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
                  boxShadow: active ? '0 0 15px rgba(123,209,250,0.3)' : 'none',
                  border: active ? 'none' : undefined,
                }}
                className={active ? '' : 'glass-card'}>
                {t('categories.' + cat.name)}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: 13, color: 'var(--on-surface-variant)' }}>{filtered.length} {t('products.count')}</span>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowSort(!showSort)}
              style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: 'var(--on-surface-variant)', background: 'none', padding: '4px 8px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>sort</span>
              {currentSortLabel}
            </button>
            {showSort && (
              <div className="glass-elevated" style={{
                position: 'absolute', top: '100%', right: 0, zIndex: 50,
                borderRadius: 12, padding: 8, minWidth: 200,
              }}>
                {sortOptions.map((opt) => (
                  <button key={opt.key} onClick={() => { setSort(opt.key); setShowSort(false); }}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left', padding: '10px 12px',
                      borderRadius: 12, background: sort === opt.key ? 'rgba(125,211,252,0.08)' : 'transparent',
                      fontSize: 14, color: sort === opt.key ? 'var(--primary)' : 'var(--on-surface)',
                    }}>
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {filtered.map((p, i) => (
            <div key={p.id} onClick={() => navigate(`/product/${p.id}`)}
              style={{ cursor: 'pointer', marginTop: i % 2 === 1 ? 24 : 0 }}>
              <div style={{
                position: 'relative', width: '100%', aspectRatio: '4/5', borderRadius: 16, overflow: 'hidden',
              }} className="glass-card">
                <img src={p.image} alt={p.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '8px 4px' }}>
                <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('categories.' + p.category)}</p>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--on-surface)', marginTop: 2 }}>{p.name}</p>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)', marginTop: 2 }}>{p.price.toLocaleString()}₴</p>
              </div>
            </div>
          ))}
        </section>
      </main>

      <BottomBar />
    </div>
  );
}
