import React from 'react';

const quickLinks = [
  'Track account opening',
  'Track segment activation',
  'Intraday margins',
  'Kite user manual',
];

const featured = [
  'Current Takeovers and Delisting - 2024',
  'Latest Intraday Leverages - MIS & CO',
];

function HeroSupport() {
  return (
    <div style={{ background: '#fff', paddingTop: '70px' }}>

      {/* ── Hero Banner ── */}
      <div style={{
        background: 'linear-gradient(135deg, #1a237e 0%, #283593 60%, #3949ab 100%)',
        padding: '70px 20px',
      }}>
        <div style={{
          maxWidth: '960px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '48px',
        }}>

          {/* Left — Search */}
          <div style={{ flex: '1 1 360px' }}>
            <p style={{
              color: '#c5cae9',
              fontWeight: '700',
              fontSize: '0.78rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}>
              Support Portal
            </p>

            <h1 style={{
              fontSize: '2.2rem',
              fontWeight: '800',
              color: '#fff',
              lineHeight: '1.3',
              marginBottom: '24px',
            }}>
              How can we help you?
            </h1>

            {/* Search Box */}
            <div style={{ position: 'relative', marginBottom: '28px' }}>
              <input
                type="text"
                placeholder="Eg. how do I activate F&O, why is my order blocked..."
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '0.95rem',
                  color: '#333',
                  boxSizing: 'border-box',
                  outline: 'none',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                }}
              />
            </div>

            {/* Quick Links */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {quickLinks.map((link, i) => (
                <button key={i} type="button" style={{
                  color: '#fff',
                  fontSize: '0.83rem',
                  textDecoration: 'none',
                  background: 'rgba(255,255,255,0.15)',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.25)',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Right — Featured */}
          <div style={{ flex: '1 1 240px', maxWidth: '300px' }}>
            <p style={{
              color: '#c5cae9',
              fontWeight: '700',
              fontSize: '0.78rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '18px',
            }}>
              Featured
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {featured.map((item, i) => (
                <button key={i} type="button" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#fff',
                  textDecoration: 'none',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  fontSize: '0.9rem',
                  lineHeight: '1.5',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                >
                  
                  {item}
                </button>
              ))}

              <button type="button" style={{
                color: '#c5cae9',
                fontSize: '0.83rem',
                textDecoration: 'underline',
                marginTop: '4px',
                textAlign: 'right',
                background: 'transparent',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
              }}>
                Track Tickets →
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default HeroSupport;