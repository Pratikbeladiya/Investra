import React from 'react';

const chargesData = [
  { segment: 'Equity Delivery', brokerage: '₹0', stt: '0.1% on buy & sell', exchangeTxn: '0.00345% NSE / 0.00296% BSE', gst: '18% on brokerage + txn charges', sebi: '₹10 per crore', stamp: '0.015% on buy side' },
  { segment: 'Equity Intraday', brokerage: '₹20 or 0.03% (lower)', stt: '0.025% on sell side', exchangeTxn: '0.00345% NSE / 0.00296% BSE', gst: '18% on brokerage + txn charges', sebi: '₹10 per crore', stamp: '0.003% on buy side' },
  { segment: 'Equity Futures', brokerage: '₹20 or 0.03% (lower)', stt: '0.02% on sell side', exchangeTxn: '0.002% NSE', gst: '18% on brokerage + txn charges', sebi: '₹10 per crore', stamp: '0.002% on buy side' },
  { segment: 'Equity Options', brokerage: '₹20 per executed order', stt: '0.1% on sell side (premium)', exchangeTxn: '0.053% NSE', gst: '18% on brokerage + txn charges', sebi: '₹10 per crore', stamp: '0.003% on buy side' },
  { segment: 'Currency Futures', brokerage: '₹20 or 0.03% (lower)', stt: 'No STT', exchangeTxn: '0.00135% NSE', gst: '18% on brokerage + txn charges', sebi: '₹10 per crore', stamp: '0.0001% on buy side' },
  { segment: 'Direct Mutual Funds', brokerage: '₹0', stt: 'No STT', exchangeTxn: 'Nil', gst: 'Nil', sebi: 'Nil', stamp: '0.005% on buy side' },
];

const notes = [
  'Call & Trade and RMS auto-squareoff: Additional charges of ₹50 + GST per order.',
  'Digital contract notes will be sent via e-mail.',
  'Physical copies of contract notes, if required, shall be charged ₹20 per contract note. Courier charges apply.',
  'For NRI account (non-PIS): 0.5% or ₹100 per executed order for equity (whichever is lower).',
  'For NRI account (PIS): 0.5% or ₹200 per executed order for equity (whichever is lower).',
  'If the account is in debit balance, orders will be charged ₹40 per executed order instead of ₹20.',
];

function Brokerage() {
  return (
    <div style={{ background: 'var(--bg-secondary)', paddingBottom: '20px', transition: 'background-color 0.3s' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 20px' }}>

        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
          List of Charges
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '32px' }}>
          A complete breakdown of every charge across all segments.
        </p>

        {/* Charges Table */}
        <div style={{ overflowX: 'auto', borderRadius: '12px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid var(--border-color)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', background: 'var(--card-bg)' }}>
            <thead>
              <tr>
                {['Segment', 'Brokerage', 'STT', 'Exchange Txn', 'GST', 'SEBI Charges', 'Stamp Duty'].map(h => (
                  <th key={h} style={{ background: '#1a237e', color: '#fff', padding: '14px 16px', textAlign: 'left', fontWeight: '600', whiteSpace: 'nowrap' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {chargesData.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'var(--card-bg)' : 'var(--bg-secondary)' }}>
                  <td style={{ padding: '13px 16px', fontWeight: '600', color: 'var(--color-primary-text)', borderBottom: '1px solid var(--border-color)', whiteSpace: 'nowrap' }}>{row.segment}</td>
                  <td style={{ padding: '13px 16px', color: row.brokerage === '₹0' ? 'var(--color-success-text)' : 'var(--text-secondary)', fontWeight: row.brokerage === '₹0' ? '700' : '400', borderBottom: '1px solid var(--border-color)' }}>{row.brokerage}</td>
                  <td style={{ padding: '13px 16px', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)' }}>{row.stt}</td>
                  <td style={{ padding: '13px 16px', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)' }}>{row.exchangeTxn}</td>
                  <td style={{ padding: '13px 16px', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)' }}>{row.gst}</td>
                  <td style={{ padding: '13px 16px', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)' }}>{row.sebi}</td>
                  <td style={{ padding: '13px 16px', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)' }}>{row.stamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '50px 0' }} />

        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-start' }}>

          {/* Additional Notes */}
          <div style={{ flex: '2 1 320px' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
              Additional Charges &amp; Notes
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '32px' }}>
              Please read the following points carefully before placing orders.
            </p>
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              {notes.map((note, i) => (
                <li key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.8', marginBottom: '10px' }}>
                  {note}
                </li>
              ))}
            </ul>
          </div>

          {/* Brokerage Calculator CTA */}
          <div style={{ flex: '1 1 240px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #1a237e, #3949ab)',
              borderRadius: '16px', padding: '36px 28px',
              color: '#fff', textAlign: 'center',
              boxShadow: '0 8px 28px rgba(26,35,126,0.25)',
            }}>
              <div style={{ fontSize: '2.4rem', marginBottom: '14px' }}>🧮</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '10px', color: '#fff' }}>
                Brokerage Calculator
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#c5cae9', marginBottom: '24px', lineHeight: '1.6' }}>
                Calculate the exact brokerage and charges for your trades before you place them.
              </p>
              <a
                href="https://zerodha.com/brokerage-calculator"
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-block', background: '#fff', color: '#1a237e', fontWeight: '700', fontSize: '0.92rem', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#e8eaf6')}
                onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
              >
                Open Calculator →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{
        background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)',
        padding: '40px 60px', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>📈</div>
          <div>
            <p style={{ color: '#fff', fontWeight: '700', fontSize: '1.1rem', margin: '0 0 4px' }}>Ready to start your investment journey?</p>
            <p style={{ color: '#c5cae9', fontSize: '0.88rem', margin: 0 }}>Zero brokerage on equity delivery. Open your account in minutes.</p>
          </div>
        </div>
        <a
          href="/signup"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fff', color: '#1a237e', fontWeight: '700', fontSize: '0.95rem', padding: '14px 32px', borderRadius: '10px', textDecoration: 'none', whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', transition: 'background 0.2s, transform 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#e8eaf6'; e.currentTarget.style.transform = 'scale(1.04)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'scale(1)'; }}
        >
          Open Your Free Account →
        </a>
      </div>
    </div>
  );
}

export default Brokerage;