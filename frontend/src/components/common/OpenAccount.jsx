import React from 'react';
import { Link } from 'react-router-dom';

function OpenAccount() {
  return (
    <section style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: '1 1 420px', minWidth: '320px' }}>
            <p style={{ margin: 0, color: '#2563eb', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
              Start investing with confidence
            </p>
            <h2 style={{ margin: '18px 0 20px', fontSize: '2.5rem', color: '#0f172a', lineHeight: 1.05, fontWeight: 700 }}>
              Open your Investra account in minutes.
            </h2>
            <p style={{ margin: 0, color: '#475569', fontSize: '1rem', lineHeight: 1.9, maxWidth: '560px' }}>
              Get instant access to equity, derivatives, mutual funds and research tools with a modern brokerage experience and transparent pricing.
            </p>
          </div>
          <div style={{ flex: '1 1 280px', minWidth: '260px' }}>
            <Link to="/signup" style={{ display: 'inline-flex', width: '100%', alignItems: 'center', justifyContent: 'center', padding: '12px 18px', borderRadius: '999px', backgroundColor: '#2563eb', color: '#ffffff', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}>
              Start your account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
export default OpenAccount;

