import type { Product } from '../types';
import { useLang } from '../context/LangContext';

interface Props {
  product: Product;
  onClick: () => void;
  index?: number;
}

export function ProductCard({ product, onClick, index = 0 }: Props) {
  const { t } = useLang();
  return (
    <div onClick={onClick} style={{ cursor: 'pointer', marginTop: index % 2 === 1 ? 24 : 0 }} className="group">
      <div style={{
        position: 'relative', width: '100%', aspectRatio: '4/5', borderRadius: 16, overflow: 'hidden',
      }} className="glass-card">
        <div style={{
          position: 'absolute', top: 12, left: 12, zIndex: 10,
          padding: '4px 10px', borderRadius: 9999,
          backgroundColor: 'rgba(15,21,36,0.6)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(125,211,252,0.1)',
          fontSize: 10, fontWeight: 600, color: 'var(--primary)',
          textTransform: 'uppercase', letterSpacing: '0.05em',
        }}>
          {t('product.condition.' + product.condition.toLowerCase().replace(/\s+/g, '_'))}
        </div>
        <img src={product.image} alt={product.name} loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }}
          className="group-hover:scale-110" />
      </div>
      <div style={{ padding: '8px 4px' }}>
        <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('categories.' + product.category)}</p>
        <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--on-surface)', marginTop: 2 }}>{product.name}</p>
        <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)', marginTop: 2 }}>
          {product.price.toLocaleString()}₴
          {product.originalPrice && (
            <span style={{ textDecoration: 'line-through', marginLeft: 8, opacity: 0.6, color: 'var(--on-surface-variant)', fontWeight: 400, fontSize: 12 }}>
              {product.originalPrice.toLocaleString()}₴
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
