import React from 'react';
import { Link } from 'react-router-dom';

function Pricing() {
  return (
    <section style={{ padding: '80px 0', backgroundColor: '#f8fafc' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 320px', minWidth: '300px' }}>
            <p style={{ margin: 0, color: '#2563eb', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
              Transparent pricing
            </p>
            <h2 style={{ margin: '18px 0 22px', fontSize: '2.5rem', color: '#0f172a', lineHeight: 1.05, fontWeight: 700 }}>
              Simple brokerage so you can focus on investing.
            </h2>
            <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.9, marginBottom: '24px' }}>
              No hidden fees, no surprises. See the exact cost of every order before you trade.
            </p>
            <Link to="/pricing" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
              See detailed pricing
            </Link>
          </div>
          <div style={{ flex: '1 1 260px', minWidth: '260px', display: 'grid', gap: '20px' }}>
            <div style={{ padding: '26px', background: '#ffffff', borderRadius: '24px', border: '1px solid #e2e8f0', minHeight: '170px' }}>
              <h3 style={{ margin: 0, fontSize: '2.5rem', color: '#0f172a' }}>₹0</h3>
              <p style={{ margin: '14px 0 0', color: '#475569', lineHeight: 1.75 }}>Equity delivery and mutual fund investments.</p>
            </div>
            <div style={{ padding: '26px', background: '#ffffff', borderRadius: '24px', border: '1px solid #e2e8f0', minHeight: '170px' }}>
              <h3 style={{ margin: 0, fontSize: '2.5rem', color: '#0f172a' }}>₹20</h3>
              <p style={{ margin: '14px 0 0', color: '#475569', lineHeight: 1.75 }}>Flat fee for intraday and F&O trades.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Pricing;

