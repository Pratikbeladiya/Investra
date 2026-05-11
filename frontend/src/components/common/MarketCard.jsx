import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const MarketCard = ({ data, type }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      i < Math.floor(rating) ?
        <StarIcon key={i} style={{ fontSize: '0.85rem', color: '#ffd700' }} /> :
        <StarBorderIcon key={i} style={{ fontSize: '0.85rem', color: '#ddd' }} />
    ));
  };

  const getCategoryColor = (category) => {
    const colors = {
      EQUITY: '#00d09c',
      DEBT: '#2196f3',
      INDEX: '#ff9800',
      SOVEREIGN: '#10b981',
      CORPORATE: '#6366f1',
      COMMODITY: '#f59e0b'
    };
    return colors[category] || 'var(--accent-color)';
  };

  const isBond = type === 'BOND';
  const priceValue = isBond ? data.price : data.nav;
  const priceLabel = isBond ? 'Price' : 'NAV';

  return (
    <div className="market-card" style={{
      background: 'var(--card-bg)',
      border: '1px solid var(--border-color)',
      borderRadius: '16px',
      padding: '20px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '800', margin: '0 0 4px', color: 'var(--text-primary)' }}>{data.name}</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
            {data.subCategory} {isBond && `• Maturity: ${data.maturity}`}
          </span>
        </div>
        <div style={{
          background: getCategoryColor(data.category),
          color: '#fff',
          padding: '4px 10px',
          borderRadius: '8px',
          fontSize: '0.65rem',
          fontWeight: '900',
          letterSpacing: '0.5px'
        }}>
          {data.category}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0 0 2px' }}>{priceLabel}</p>
          <p style={{ fontSize: '1.1rem', fontWeight: '900', margin: 0 }}>₹{priceValue.toLocaleString()}</p>
        </div>
        {!isBond && (
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', marginBottom: '2px' }}>{renderStars(data.rating)}</div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', margin: 0 }}>{data.rating}/5.0</p>
          </div>
        )}
        {isBond && (
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0 0 2px' }}>Coupon</p>
            <p style={{ fontSize: '1.1rem', fontWeight: '900', margin: 0, color: 'var(--accent-color)' }}>{data.coupon}</p>
          </div>
        )}
      </div>

      <div style={{
        background: 'var(--bg-secondary)',
        padding: '12px',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.8rem'
      }}>
        <div>
          <span style={{ color: 'var(--text-secondary)' }}>1Y Return: </span>
          <span style={{ fontWeight: '800', color: 'var(--accent-color)' }}>+{data.returns['1Y']}%</span>
        </div>
        <div>
          <span style={{ color: 'var(--text-secondary)' }}>3Y: </span>
          <span style={{ fontWeight: '800', color: 'var(--accent-color)' }}>+{data.returns['3Y']}%</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.75rem' }}>
        <div>
          <span style={{ color: 'var(--text-secondary)' }}>Min Inv: </span>
          <span style={{ fontWeight: '700' }}>₹{data.minInvestment.toLocaleString()}</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Risk: </span>
          <span style={{ fontWeight: '700' }}>{data.risk}</span>
        </div>
      </div>

      <button className="invest-btn" style={{
        width: '100%',
        padding: '12px',
        background: 'var(--accent-color)',
        color: '#000',
        border: 'none',
        borderRadius: '12px',
        fontWeight: '900',
        fontSize: '0.85rem',
        cursor: 'pointer',
        transition: 'all 0.2s'
      }}>
        Invest Now
      </button>

      <style>{`
        .market-card:hover {
          transform: translateY(-5px);
          border-color: var(--accent-color);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .invest-btn:hover {
          opacity: 0.9;
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
};

export default MarketCard;
