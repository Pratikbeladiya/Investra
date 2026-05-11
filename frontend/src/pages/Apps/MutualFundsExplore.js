import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MarketCard from '../../components/common/MarketCard';
import { MUTUAL_FUNDS } from '../../constants/marketData';

const MutualFundsExplore = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFunds = MUTUAL_FUNDS.filter(fund =>
    fund.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '18px 24px', background: 'var(--bg-primary)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '1.45rem', fontWeight: '800', marginBottom: '4px', color: 'var(--text-primary)' }}>Mutual Funds Explorer</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>Discover top-performing mutual funds for your portfolio</p>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <div style={{ position: 'relative', width: '280px' }}>
            <SearchIcon style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', fontSize: '1rem' }} />
            <input
              type="text"
              placeholder="Search mutual funds..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '8px 10px 8px 34px', border: '1px solid var(--border-color)', borderRadius: '10px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.82rem', outline: 'none' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {filteredFunds.map(fund => (
            <MarketCard key={fund.id} data={fund} type="MF" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MutualFundsExplore;