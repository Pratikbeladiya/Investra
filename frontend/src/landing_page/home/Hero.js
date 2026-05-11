import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section style={{ backgroundColor: '#f8fafc', padding: '80px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: '1 1 520px', minWidth: '320px' }}>
            <p style={{ margin: 0, color: '#2563eb', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
              Trade better with confidence
            </p>
            <h1 style={{ margin: '24px 0 16px', fontSize: '3rem', lineHeight: '1.05', color: '#0f172a', fontWeight: 700 }}>
              A professional brokerage platform built for modern investors.
            </h1>
            <p style={{ margin: 0, color: '#475569', fontSize: '1.05rem', lineHeight: '1.9', maxWidth: '620px' }}>
              Investra gives you fast orders, clear pricing, and powerful market insights so you can invest with certainty instead of noise.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '32px' }}>
              <Link to="/signup" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '10px 20px', borderRadius: '999px', backgroundColor: '#2563eb', color: '#fff', fontWeight: 600, textDecoration: 'none', minWidth: '140px', fontSize: '0.9rem' }}>
                Create account
              </Link>
              <Link to="/pricing" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '10px 20px', borderRadius: '999px', backgroundColor: '#e2e8f0', color: '#0f172a', fontWeight: 600, textDecoration: 'none', minWidth: '140px', fontSize: '0.9rem' }}>
                View pricing
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginTop: '48px' }}>
              <div style={{ padding: '20px', background: '#ffffff', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
                <p style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>₹0 delivery brokerage</p>
                <p style={{ margin: '10px 0 0', color: '#64748b', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  Invest in stocks and mutual funds with zero delivery charges.
                </p>
              </div>
              <div style={{ padding: '20px', background: '#ffffff', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
                <p style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>Fast order execution</p>
                <p style={{ margin: '10px 0 0', color: '#64748b', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  Execute trades instantly across equities, derivatives and funds.
                </p>
              </div>
              <div style={{ padding: '20px', background: '#ffffff', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
                <p style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>Clear pricing</p>
                <p style={{ margin: '10px 0 0', color: '#64748b', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  No hidden fees. Just transparent, predictable brokerage.
                </p>
              </div>
            </div>
          </div>

          <div style={{ flex: '1 1 420px', minWidth: '320px' }}>
            <img src="media/images/homeHero.png" alt="Investra trading dashboard preview" style={{ width: '100%', borderRadius: '28px', boxShadow: '0 35px 90px rgba(15, 23, 42, 0.12)' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
