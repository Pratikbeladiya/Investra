import React from 'react';
import { Link } from 'react-router-dom';

function Awards() {
  return (
    <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-primary)', transition: 'background-color 0.3s' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
          <div style={{ flex: '1 1 440px', minWidth: '320px' }}>
            <img src="media/images/largestBroker.svg" alt="Investra trading illustration" style={{ width: '100%', maxWidth: '520px' }} />
          </div>
          <div style={{ flex: '1 1 480px', minWidth: '320px' }}>
            <p style={{ margin: 0, color: '#2563eb', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
              Built for serious investors
            </p>
            <h2 style={{ margin: '18px 0 20px', fontSize: '2.65rem', color: 'var(--text-primary)', lineHeight: 1.05, fontWeight: 700 }}>
              Trade stocks, funds and derivatives with clarity.
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.9, marginBottom: '30px' }}>
              Investra supports every investor profile with intuitive tools, transparent pricing and fast execution across markets.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {[
                { title: 'Mobile and web', desc: 'Seamless trading from every device.' },
                { title: 'Portfolio insights', desc: 'Track your holdings with real-time analytics.' },
                { title: 'Research-ready', desc: 'Data and insights that help you act faster.' },
              ].map(({ title, desc }) => (
                <div key={title} style={{ padding: '20px', borderRadius: '18px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', transition: 'background-color 0.3s' }}>
                  <p style={{ margin: 0, fontWeight: 700, color: 'var(--text-primary)' }}>{title}</p>
                  <p style={{ margin: '10px 0 0', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{desc}</p>
                </div>
              ))}
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
