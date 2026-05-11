import React, { useState } from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InfoIcon from '@mui/icons-material/Info';

const IPOExplore = () => {
  const [filter, setFilter] = useState('ALL');

  const ipoData = [
    {
      id: 1,
      company: "TechNova Solutions Ltd",
      symbol: "TECH",
      priceRange: "₹450 - ₹480",
      minQty: 50,
      lotSize: 50,
      openDate: "2026-05-15",
      closeDate: "2026-05-18",
      listingDate: "2026-05-22",
      status: "OPEN",
      category: "Technology",
      issueSize: "₹1,250 Cr",
      subscription: "2.8x",
      gmp: "+₹45 (10.4%)",
      risk: "Medium",
      description: "Leading AI and cloud computing solutions provider with a global footprint."
    },
    {
      id: 2,
      company: "GreenEnergy Corp Ltd",
      symbol: "GREEN",
      priceRange: "₹320 - ₹340",
      minQty: 75,
      lotSize: 75,
      openDate: "2026-05-20",
      closeDate: "2026-05-23",
      listingDate: "2026-05-27",
      status: "UPCOMING",
      category: "Energy",
      issueSize: "₹850 Cr",
      subscription: "N/A",
      gmp: "+₹28 (8.7%)",
      risk: "Low",
      description: "Pioneering renewable energy solutions and sustainable solar power systems."
    },
    {
      id: 3,
      company: "MediCare Health Ltd",
      symbol: "MEDI",
      priceRange: "₹280 - ₹300",
      minQty: 100,
      lotSize: 100,
      openDate: "2026-05-10",
      closeDate: "2026-05-13",
      listingDate: "2026-05-17",
      status: "CLOSED",
      category: "Healthcare",
      issueSize: "₹650 Cr",
      subscription: "4.2x",
      gmp: "+₹35 (12.1%)",
      risk: "Low",
      description: "Innovative healthcare services and medical technology provider."
    }
  ];

  const filteredIPOs = filter === 'ALL' ? ipoData : ipoData.filter(ipo => ipo.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'OPEN': return '#00d09c';
      case 'UPCOMING': return '#ffa500';
      case 'CLOSED': return '#ff5252';
      default: return '#666';
    }
  };

  return (
    <div style={{ padding: '18px 24px', background: 'var(--bg-primary)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '1.45rem', fontWeight: '800', marginBottom: '4px', color: 'var(--text-primary)' }}>IPO Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>Track and apply for the latest Initial Public Offerings</p>
        </div>

        {/* Info Banner */}
        <div style={{ background: 'rgba(0,208,156,0.05)', border: '1px solid rgba(0,208,156,0.1)', padding: '12px 16px', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <InfoIcon style={{ color: 'var(--accent-color)', fontSize: '1.2rem' }} />
          <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', margin: 0 }}>
            Applying for IPOs is now easier. Your funds will be blocked in your bank account via UPI Mandate.
          </p>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          {['ALL', 'OPEN', 'UPCOMING', 'CLOSED'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              style={{
                padding: '10px 20px', borderRadius: '10px', border: 'none',
                background: filter === tab ? 'var(--accent-color)' : 'transparent',
                color: filter === tab ? '#000' : 'var(--text-secondary)',
                fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
          {filteredIPOs.map(ipo => (
            <div key={ipo.id} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '18px', transition: 'all 0.3s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: '800', margin: '0 0 2px' }}>{ipo.company}</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600' }}>{ipo.symbol} • {ipo.category}</span>
                </div>
                <div style={{ background: getStatusColor(ipo.status), color: '#fff', padding: '3px 10px', borderRadius: '8px', fontSize: '0.65rem', fontWeight: '800' }}>{ipo.status}</div>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '10px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Price Range</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: '800' }}>{ipo.priceRange}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Min Investment</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: '800' }}>₹{(parseInt(ipo.priceRange.split('-')[1].replace('₹', '')) * ipo.minQty).toLocaleString()}</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px', fontSize: '0.75rem' }}>
                <div><span style={{ color: 'var(--text-secondary)' }}>Issue Size: </span><span style={{ fontWeight: '700' }}>{ipo.issueSize}</span></div>
                <div style={{ textAlign: 'right' }}><span style={{ color: 'var(--text-secondary)' }}>Lot Size: </span><span style={{ fontWeight: '700' }}>{ipo.lotSize}</span></div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <TrendingUpIcon style={{ fontSize: '1rem', color: 'var(--accent-color)' }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-color)' }}>GMP: {ipo.gmp}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CalendarTodayIcon style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }} />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{new Date(ipo.openDate).toLocaleDateString()}</span>
                </div>
              </div>

              <button
                disabled={ipo.status !== 'OPEN'}
                style={{
                  width: '100%', padding: '12px',
                  background: ipo.status === 'OPEN' ? 'var(--accent-color)' : 'var(--bg-secondary)',
                  color: ipo.status === 'OPEN' ? '#000' : 'var(--text-secondary)',
                  border: 'none', borderRadius: '10px', fontWeight: '800', fontSize: '0.85rem',
                  cursor: ipo.status === 'OPEN' ? 'pointer' : 'not-allowed'
                }}
              >
                {ipo.status === 'OPEN' ? 'Apply Now' : 'Closed'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IPOExplore;