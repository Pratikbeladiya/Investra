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
          <div style={{ flex: '1 1 420px', minWidth: '320px' }}>
            <img src="media/images/education.svg" alt="Investra education resources" style={{ width: '100%', borderRadius: '24px', boxShadow: '0 35px 80px rgba(15, 23, 42, 0.08)' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
export default Education;

