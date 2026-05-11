import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SecurityIcon from '@mui/icons-material/Security';
import MarketCard from '../../components/common/MarketCard';
import { BONDS } from '../../constants/marketData';

const BondExplore = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBonds = BONDS.filter(bond =>
    bond.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '18px 24px', background: 'var(--bg-primary)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '1.45rem', fontWeight: '800', marginBottom: '4px', color: 'var(--text-primary)' }}>Bonds Explorer</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>Secure fixed-income investments for stable returns</p>
        </div>

        <div style={{ background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.1)', padding: '12px 16px', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <SecurityIcon style={{ color: '#6366f1', fontSize: '1.2rem' }} />
          <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', margin: 0 }}>
            Bonds are safer than stocks and offer regular interest payments. Ideal for long-term wealth preservation.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <div style={{ position: 'relative', width: '280px' }}>
            <SearchIcon style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', fontSize: '1rem' }} />
            <input
              type="text"
              placeholder="Search Bonds..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '8px 10px 8px 34px', border: '1px solid var(--border-color)', borderRadius: '10px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.82rem', outline: 'none' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {filteredBonds.map(bond => (
            <MarketCard key={bond.id} data={bond} type="BOND" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BondExplore;
