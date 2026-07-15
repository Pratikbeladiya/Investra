import React from 'react';

const topics = [
  { icon: '➕', title: 'Account Opening', links: ['Online Account Opening', 'Offline Account Opening', 'Company, Partnership & HUF Account', 'NRI Account Opening', 'Charges at Zerodha', 'Getting Started'] },
  { icon: '👤', title: 'Your Zerodha Account', links: ['Login Credentials', 'Account Modification & Segment Addition', 'DP ID and Bank Details', 'Your Profile', 'Transfer and Conversion of Shares'] },
  { icon: '📊', title: 'Trading and Markets', links: ['Margin / Leverage, Product & Order Types', 'Kite Web and Mobile', 'Trading FAQs', 'Corporate Actions', 'Sensibull, Kite Connect & Other Platforms'] },
  { icon: '💳', title: 'Funds', links: ['Adding Funds', 'Fund Withdrawal', 'eMandates', 'Adding Bank Accounts'] },
  { icon: '🖥️', title: 'Console', links: ['Reports', 'Ledger', 'Portfolio', '60 Day Challenge', 'IPO'] },
  { icon: '🪙', title: 'Coin (Mutual Funds)', links: ['Understanding Mutual Funds', 'Coin App', 'Coin Web', 'Transactions and Reports', 'National Pension Scheme (NPS)'] },
];

function RaiseTicket() {
  return (
    <div style={{ background: 'var(--bg-secondary)', paddingBottom: '0', transition: 'background-color 0.3s' }}>

      {/* Topics Section */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '70px 20px' }}>
        <p style={{ color: 'var(--color-primary-text)', fontWeight: '700', fontSize: '0.78rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>
          Browse Topics
        </p>
        <h2 style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '40px' }}>
          Select a topic to raise a ticket
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
          {topics.map((topic, i) => (
            <div key={i}
              style={{
                background: 'var(--bg-primary)',
                borderRadius: '14px', padding: '26px 24px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                border: '1px solid var(--border-color)',
                transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(0,0,0,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                  {topic.icon}
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
                  {topic.title}
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {topic.links.map((link, j) => (
                  <button key={j} type="button" style={{
                    color: 'var(--color-primary-text)', fontSize: '0.88rem', lineHeight: '1.5',
                    transition: 'color 0.15s', background: 'transparent',
                    border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-color)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--color-primary-text)'}
                  >
                    → {link}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)', padding: '40px 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div>
            <p style={{ color: '#fff', fontWeight: '700', fontSize: '1.1rem', margin: '0 0 4px' }}>Didn't find what you were looking for?</p>
            <p style={{ color: '#c5cae9', fontSize: '0.88rem', margin: 0 }}>Open a free account and get dedicated support.</p>
          </div>
        </div>
        <a href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fff', color: '#1a237e', fontWeight: '700', fontSize: '0.95rem', padding: '14px 32px', borderRadius: '10px', textDecoration: 'none', whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', transition: 'background 0.2s, transform 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#e8eaf6'; e.currentTarget.style.transform = 'scale(1.04)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'scale(1)'; }}
        >
          Open Your Free Account →
        </a>
      </div>
    </div>
  );
}

export default RaiseTicket;