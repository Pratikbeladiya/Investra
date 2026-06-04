import React from "react";

const linkStyle = {
  display: 'block',
  color: 'var(--text-secondary)',
  fontSize: '0.95rem',
  textDecoration: 'none',
  lineHeight: '1.9',
  marginBottom: '10px',
  transition: 'color 0.2s ease',
};

function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      padding: '64px 24px 32px',
      fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      borderTop: '1px solid var(--border-color)',
      transition: 'background-color 0.3s, color 0.3s',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'space-between' }}>
          <div style={{ minWidth: '240px', flex: '1 1 280px' }}>
            <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Investra</p>
            <p style={{ marginTop: '14px', color: 'var(--text-secondary)', lineHeight: '1.8', maxWidth: '320px' }}>
              A smooth brokerage platform built for investors who want clarity, speed, and no hidden surprises.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px', flex: '2 1 520px' }}>
            <div>
              <p style={{ marginBottom: '16px', color: 'var(--text-primary)', fontWeight: 700 }}>Products</p>
              <a href="/" style={linkStyle}>Stocks</a>
              <a href="/" style={linkStyle}>Mutual Funds</a>
              <a href="/" style={linkStyle}>Derivatives</a>
              <a href="/" style={linkStyle}>Research</a>
            </div>

            <div>
              <p style={{ marginBottom: '16px', color: 'var(--text-primary)', fontWeight: 700 }}>Company</p>
              <a href="/about" style={linkStyle}>About</a>
              <a href="/pricing" style={linkStyle}>Pricing</a>
              <a href="/support" style={linkStyle}>Careers</a>
              <a href="/support" style={linkStyle}>Press</a>
            </div>

            <div>
              <p style={{ marginBottom: '16px', color: 'var(--text-primary)', fontWeight: 700 }}>Support</p>
              <a href="/support" style={linkStyle}>Help Center</a>
              <a href="/support" style={linkStyle}>Contact</a>
              <a href="/" style={linkStyle}>Security</a>
              <a href="/" style={linkStyle}>Documentation</a>
            </div>
          </div>
        </div>

        <div style={{
          marginTop: '42px',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
        }}>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>© 2026 Investra. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            {[
              { label: 'LinkedIn', href: 'https://www.linkedin.com' },
              { label: 'Twitter', href: 'https://www.twitter.com' },
              { label: 'Instagram', href: 'https://www.instagram.com' },
            ].map(({ label, href }) => (
              <a key={label} href={href} rel="noreferrer" target="_blank" style={{
                color: 'var(--text-secondary)',
                fontSize: '0.95rem',
                textDecoration: 'none',
                border: '1px solid var(--border-color)',
                borderRadius: '999px',
                padding: '8px 14px',
                transition: 'border-color 0.2s ease, color 0.2s ease',
              }}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
