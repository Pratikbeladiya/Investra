import React from 'react';
import { Link } from 'react-router-dom';

function Education() {
  return (
    <section style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
          <div style={{ flex: '1 1 480px', minWidth: '320px' }}>
            <p style={{ margin: 0, color: '#2563eb', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
              Market intelligence
            </p>
            <h2 style={{ margin: '18px 0 20px', fontSize: '2.5rem', color: '#0f172a', lineHeight: 1.05, fontWeight: 700 }}>
              Resources that help you trade smarter.
            </h2>
            <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.9, marginBottom: '24px' }}>
              Access research reports, weekly market calls, and education tools without the noise.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
              <article style={{ padding: '22px', borderRadius: '18px', border: '1px solid #e2e8f0', background: '#f8fafc' }}>
                <p style={{ margin: 0, fontWeight: 700, color: '#0f172a' }}>Expert insights</p>
                <p style={{ margin: '10px 0 0', color: '#64748b', fontSize: '0.95rem' }}>Curated market commentary every day.</p>
              </article>
              <article style={{ padding: '22px', borderRadius: '18px', border: '1px solid #e2e8f0', background: '#f8fafc' }}>
                <p style={{ margin: 0, fontWeight: 700, color: '#0f172a' }}>Learning tracks</p>
                <p style={{ margin: '10px 0 0', color: '#64748b', fontSize: '0.95rem' }}>Beginner to advanced trading modules.</p>
              </article>
            </div>
            <Link to="/support" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginTop: '30px', padding: '14px 24px', borderRadius: '999px', backgroundColor: '#2563eb', color: '#ffffff', textDecoration: 'none', fontWeight: 600 }}>
              Explore resources
            </Link>
          </div>
          <div style={{ flex: '1 1 420px', minWidth: '320px', background: '#f1f5f9', padding: '40px', borderRadius: '24px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '20px' }}>Why trade with Investra?</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { title: 'Trusted by Millions', desc: 'Join over 1 crore clients who trust us with their investments.' },
                { title: 'Cutting-edge Tech', desc: 'Fast, reliable, and secure trading platforms for all devices.' },
                { title: 'Transparent Pricing', desc: 'Zero brokerage on equity delivery and direct mutual funds.' }
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: '20px', display: 'flex', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563eb', marginTop: '8px', flexShrink: 0 }}></div>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, color: '#0f172a', fontSize: '1rem' }}>{item.title}</p>
                    <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Education;
