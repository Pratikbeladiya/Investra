import React from 'react';

const cards = [
  {
    icon: '₹0', iconColor: '#387ed1',
    title: 'Free equity delivery',
    desc: 'All equity delivery investments (NSE, BSE) are absolutely free — ₹0 brokerage.',
    badge: 'FREE', badgeBg: '#e8f5e9', badgeColor: '#2e7d32',
  },
  {
    icon: '₹20', iconColor: '#e65c00',
    title: 'Intraday & F&O trades',
    desc: 'Flat ₹20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity.',
    badge: 'FLAT FEE', badgeBg: '#fff3e0', badgeColor: '#e65c00',
  },
  {
    icon: '₹0', iconColor: '#387ed1',
    title: 'Free direct mutual funds',
    desc: 'All direct mutual fund investments are absolutely free — ₹0 commissions & DP charges.',
    badge: 'FREE', badgeBg: '#e8f5e9', badgeColor: '#2e7d32',
  },
];

function HeroPricing() {
  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', paddingBottom: '60px', transition: 'background-color 0.3s' }}>

      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1a237e 0%, #283593 60%, #3949ab 100%)',
        color: '#fff', textAlign: 'center', padding: '80px 20px 60px',
      }}>
        <h1 style={{ fontSize: '2.8rem', fontWeight: '700', margin: '0 0 16px', color: '#fff' }}>
          Simple, Transparent Pricing
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#c5cae9', maxWidth: '520px', margin: '0 auto' }}>
          Free equity investments and flat ₹20 intraday &amp; F&amp;O trades. No hidden charges, ever.
        </p>
      </div>

      {/* Cards */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: '28px',
        flexWrap: 'wrap', maxWidth: '1100px',
        margin: '-50px auto 0', padding: '0 20px',
      }}>
        {cards.map((card, i) => (
          <div key={i}
            style={{
              background: 'var(--card-bg)',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
              border: '1px solid var(--border-color)',
              padding: '40px 32px',
              flex: '1 1 280px', maxWidth: '320px',
              textAlign: 'center',
              transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.3s',
              cursor: 'default',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.18)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.10)';
            }}>
            <div style={{ fontSize: '3.2rem', fontWeight: '800', color: card.iconColor, marginBottom: '8px', lineHeight: 1 }}>
              {card.icon}
            </div>
            <span style={{
              display: 'inline-block', background: card.badgeBg, color: card.badgeColor,
              fontSize: '0.72rem', fontWeight: '700', letterSpacing: '1px',
              borderRadius: '20px', padding: '3px 12px', marginBottom: '18px',
            }}>
              {card.badge}
            </span>
            <h3 style={{ fontSize: '1.18rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '12px' }}>
              {card.title}
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.7', margin: 0 }}>
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroPricing;