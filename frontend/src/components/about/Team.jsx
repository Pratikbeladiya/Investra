import React from 'react';

/* ── Our Values data ── */
const values = [
  {
    title: 'Trust & Security',
    desc: 'Your security and trust are our top priorities. We are SEBI regulated.',
    bg: '#eef2ff',
    iconBg: '#c7d2fe',
  },
  {
    title: 'Customer First',
    desc: 'We put our users first in everything we design, build, and support.',
    bg: '#f0fdf4',
    iconBg: '#bbf7d0',
  },
  {
    title: 'Innovation',
    desc: 'We constantly innovate to bring you the best, most modern trading tools.',
    bg: '#fefce8',
    iconBg: '#fde68a',
  },
  {
    title: 'Transparency',
    desc: 'Clear pricing, no hidden charges — ever. What you see is what you pay.',
    bg: '#fff7ed',
    iconBg: '#fed7aa',
  },
];

function Team() {
  return (
    <div style={{ background: '#f7f8fc' }}>

      {/* ── Our Values Section ── */}
      <div style={{
        maxWidth: '960px',
        margin: '0 auto',
        padding: '70px 20px',
      }}>

        {/* Section Label */}
        <p style={{
          color: '#4f46e5',
          fontWeight: '700',
          fontSize: '0.82rem',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginBottom: '10px',
        }}>
          Our Values
        </p>

        <h2 style={{
          fontSize: '2rem',
          fontWeight: '800',
          color: '#111827',
          marginBottom: '48px',
        }}>
          What we stand for
        </h2>

        {/* 4 Value Cards */}
        <div style={{
          display: 'flex',
          gap: '24px',
          flexWrap: 'wrap',
        }}>
          {values.map((v, i) => (
            <div
              key={i}
              style={{
                flex: '1 1 200px',
                background: '#fff',
                borderRadius: '16px',
                padding: '28px 24px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
              }}
            >
              {/* Bullet point instead of icon */}
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#4f46e5',
                marginBottom: '18px',
              }}>
              </div>

              <h4 style={{
                fontSize: '1rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '10px',
              }}>
                {v.title}
              </h4>

              <p style={{
                fontSize: '0.88rem',
                color: '#666',
                lineHeight: '1.65',
                margin: 0,
              }}>
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div style={{
        background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)',
        padding: '40px 60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '24px',
      }}>
        {/* Left text */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div>
            <p style={{
              color: '#fff',
              fontWeight: '700',
              fontSize: '1.1rem',
              margin: '0 0 4px',
            }}>
              Ready to start your investment journey?
            </p>
            <p style={{
              color: '#c5cae9',
              fontSize: '0.88rem',
              margin: 0,
            }}>
              Join thousands of smart investors today.
            </p>
          </div>
        </div>

        {/* Right Button */}
        <a
          href="/signup"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#fff',
            color: '#1a237e',
            fontWeight: '700',
            fontSize: '0.85rem',
            padding: '10px 24px',
            borderRadius: '10px',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            transition: 'background 0.2s, transform 0.15s',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#e8eaf6';
            e.currentTarget.style.transform = 'scale(1.04)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#fff';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Open Your Free Account →
        </a>
      </div>

    </div>
  );
}

export default Team;