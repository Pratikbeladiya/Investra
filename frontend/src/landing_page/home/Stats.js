import React from 'react';
import { Link } from 'react-router-dom';

function Stats() {
  return (
    <section style={{ padding: '80px 0', backgroundColor: '#f8fafc' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '36px', alignItems: 'center' }}>
          <div style={{ flex: '1 1 480px', minWidth: '320px' }}>
            <p style={{ margin: 0, color: '#2563eb', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
              Trusted by traders
            </p>
            <h2 style={{ margin: '18px 0 20px', fontSize: '2.5rem', color: '#0f172a', lineHeight: 1.05, fontWeight: 700 }}>
              A platform designed to keep trading simple.
            </h2>
            <div style={{ display: 'grid', gap: '16px', marginTop: '24px' }}>
              <div style={{ padding: '24px', background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a', fontWeight: 700 }}>Customer-first always</h3>
                <p style={{ margin: '12px 0 0', color: '#64748b', lineHeight: 1.8 }}>Clean tools without spam, push notifications, or gimmicks.</p>
              </div>
              <div style={{ padding: '24px', background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a', fontWeight: 700 }}>Platform reliability</h3>
                <p style={{ margin: '12px 0 0', color: '#64748b', lineHeight: 1.8 }}>Tools built to perform through market volatility.</p>
              </div>
            </div>
            <Link to="/support" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginTop: '30px', padding: '14px 24px', borderRadius: '999px', backgroundColor: '#2563eb', color: '#ffffff', textDecoration: 'none', fontWeight: 600 }}>
              Explore product support
            </Link>
          </div>
          <div style={{ flex: '1 1 420px', minWidth: '320px' }}>
            <img src="media/images/ecosystem.png" alt="Investra product ecosystem" style={{ width: '100%', borderRadius: '28px', boxShadow: '0 35px 90px rgba(15, 23, 42, 0.12)' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
export default Stats;
