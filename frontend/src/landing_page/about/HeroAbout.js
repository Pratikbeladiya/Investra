import React from 'react';

function HeroAbout() {
  return (
    <div style={{ background: '#fff', paddingTop: '70px' }}>

      {/* ── Hero Section ── */}
      <div style={{
        background: 'linear-gradient(135deg, #f5f6ff 0%, #eef0ff 100%)',
        padding: '70px 20px',
      }}>
        {/* Centered inner container */}
        <div style={{
          maxWidth: '960px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '48px',
          flexWrap: 'wrap',
        }}>

          {/* Left Text */}
          <div style={{ flex: '1 1 360px', maxWidth: '480px' }}>
            <p style={{
              color: '#4f46e5',
              fontWeight: '700',
              fontSize: '0.78rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}>
              About Us
            </p>

            <h1 style={{
              fontSize: '2.6rem',
              fontWeight: '800',
              color: '#111827',
              lineHeight: '1.2',
              margin: '0 0 8px',
            }}>
              Built for investors.
            </h1>
            <h1 style={{
              fontSize: '2.6rem',
              fontWeight: '800',
              color: '#4f46e5',
              lineHeight: '1.2',
              margin: '0 0 22px',
            }}>
              Backed by trust.
            </h1>

            <p style={{
              fontSize: '1rem',
              color: '#555',
              lineHeight: '1.8',
              margin: 0,
            }}>
              We were founded with a simple mission — to make investing simple,
              transparent, and accessible for everyone in India.
            </p>
          </div>

          {/* Right — Illustration */}
          <div style={{
            flex: '1 1 260px',
            maxWidth: '340px',
            background: 'linear-gradient(135deg, #c7d2fe 0%, #a5b4fc 60%, #818cf8 100%)',
            borderRadius: '20px',
            height: '240px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '4.5rem',
            boxShadow: '0 12px 40px rgba(99,102,241,0.22)',
            position: 'relative',
          }}>
            {/* Simple Bar Chart */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: '8px',
              height: '120px',
            }}>
              <div style={{
                width: '20px',
                background: '#fff',
                borderRadius: '4px 4px 0 0',
                height: '40px',
              }}></div>
              <div style={{
                width: '20px',
                background: '#fff',
                borderRadius: '4px 4px 0 0',
                height: '80px',
              }}></div>
              <div style={{
                width: '20px',
                background: '#fff',
                borderRadius: '4px 4px 0 0',
                height: '60px',
              }}></div>
              <div style={{
                width: '20px',
                background: '#fff',
                borderRadius: '4px 4px 0 0',
                height: '100px',
              }}></div>
              <div style={{
                width: '20px',
                background: '#fff',
                borderRadius: '4px 4px 0 0',
                height: '70px',
              }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Our Story ── */}
      <div style={{
        maxWidth: '960px',
        margin: '0 auto',
        padding: '70px 20px',
        display: 'flex',
        gap: '60px',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
      }}>

        {/* Story Left */}
        <div style={{ flex: '1 1 300px' }}>
          <p style={{
            color: '#4f46e5',
            fontWeight: '700',
            fontSize: '0.78rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}>
            Our Story
          </p>
          <h2 style={{
            fontSize: '1.85rem',
            fontWeight: '800',
            color: '#111827',
            marginBottom: '22px',
            lineHeight: '1.3',
          }}>
            The journey that drives us forward
          </h2>
          <p style={{ color: '#555', lineHeight: '1.8', marginBottom: '16px', fontSize: '0.95rem' }}>
            We began with a group of passionate finance and technology enthusiasts
            who believe that everyone deserves the right tools to grow their wealth.
          </p>
          <p style={{ color: '#555', lineHeight: '1.8', fontSize: '0.95rem' }}>
            From day one, our focus has been on creating a platform that's
            secure, innovative, and truly user-first. Today, we are India's
            largest discount broker by active clients.
          </p>
        </div>

        {/* Timeline Right */}
        <div style={{ flex: '1 1 280px' }}>
          {[
            {
              year: '2023',
              title: 'The Beginning',
              desc: 'Founded with a vision to democratize investing for modern Indians.',
            },
            {
              year: '2024',
              title: 'Platform Launch',
              desc: 'Launched our innovative trading platform with zero brokerage.',
            },
            {
              year: '2025 & Beyond',
              title: 'Building the Future',
              desc: 'Expanding features and empowering more investors every day.',
              isLast: true,
            },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: item.isLast ? 0 : '28px' }}>
              {/* connector line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#eef2ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem',
                  flexShrink: 0,
                }}>
                  •
                </div>
                {!item.isLast && (
                  <div style={{
                    width: '2px',
                    flex: 1,
                    background: '#c7d2fe',
                    margin: '5px 0',
                    minHeight: '28px',
                  }} />
                )}
              </div>

              {/* Text */}
              <div style={{ paddingTop: '5px' }}>
                <p style={{
                  color: '#4f46e5',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}>
                  {item.year}
                </p>
                <h4 style={{ color: '#111827', fontWeight: '700', fontSize: '0.97rem', marginBottom: '5px' }}>
                  {item.title}
                </h4>
                <p style={{ color: '#666', fontSize: '0.86rem', lineHeight: '1.6', margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroAbout;