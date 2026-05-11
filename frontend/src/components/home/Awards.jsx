import React from 'react';
import { Link } from 'react-router-dom';

function Awards() {
  return (
    <section style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
          <div style={{ flex: '1 1 440px', minWidth: '320px' }}>
            <img src="media/images/largestBroker.svg" alt="Investra trading illustration" style={{ width: '100%', maxWidth: '520px' }} />
          </div>
          <div style={{ flex: '1 1 480px', minWidth: '320px' }}>
            <p style={{ margin: 0, color: '#2563eb', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
              Built for serious investors
            </p>
            <h2 style={{ margin: '18px 0 20px', fontSize: '2.65rem', color: '#0f172a', lineHeight: 1.05, fontWeight: 700 }}>
              Trade stocks, funds and derivatives with clarity.
            </h2>
            <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.9, marginBottom: '30px' }}>
              Investra supports every investor profile with intuitive tools, transparent pricing and fast execution across markets.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div style={{ padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0', background: '#f8fafc' }}>
                <p style={{ margin: 0, fontWeight: 700, color: '#0f172a' }}>Mobile and web</p>
                <p style={{ margin: '10px 0 0', color: '#6b7280', fontSize: '0.95rem' }}>Seamless trading from every device.</p>
              </div>
              <div style={{ padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0', background: '#f8fafc' }}>
                <p style={{ margin: 0, fontWeight: 700, color: '#0f172a' }}>Portfolio insights</p>
                <p style={{ margin: '10px 0 0', color: '#6b7280', fontSize: '0.95rem' }}>Track your holdings with real-time analytics.</p>
              </div>
              <div style={{ padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0', background: '#f8fafc' }}>
                <p style={{ margin: 0, fontWeight: 700, color: '#0f172a' }}>Research-ready</p>
                <p style={{ margin: '10px 0 0', color: '#6b7280', fontSize: '0.95rem' }}>Data and insights that help you act faster.</p>
              </div>
            </div>
            <Link to="/about" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '14px 24px', borderRadius: '999px', backgroundColor: '#2563eb', color: '#ffffff', textDecoration: 'none', fontWeight: 600 }}>
              Discover Investra
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Awards;

