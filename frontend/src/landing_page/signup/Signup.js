import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!fullName.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      setError('Please fill in all fields to continue.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3002/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: fullName.trim(), 
          email: email.trim(), 
          password 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      setSuccess('Account created successfully. Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (apiError) {
      setError(apiError.message || 'Signup failed. Please try again.');
    }

  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid #e5e7eb',
    fontSize: '0.95rem',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  const focusStyle = (e) => {
    e.target.style.borderColor = '#4f46e5';
    e.target.style.boxShadow = '0 0 0 3px rgba(79,70,229,0.1)';
  };

  const blurStyle = (e) => {
    e.target.style.borderColor = '#e5e7eb';
    e.target.style.boxShadow = 'none';
  };

  return (
    <div style={{ background: '#f7f8fc', minHeight: 'calc(100vh - 120px)', padding: '60px 20px' }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '60px',
      }}>

        {/* Left Side: Value Proposition */}
        <div style={{ flex: '1 1 400px', maxWidth: '480px' }}>
          <div style={{
            display: 'inline-block',
            color: '#4f46e5',
            fontWeight: '700',
            fontSize: '0.8rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '16px',
            background: '#eef2ff',
            padding: '6px 12px',
            borderRadius: '20px',
          }}>
            Join Us Today
          </div>
          
          <h1 style={{
            fontSize: '2.8rem',
            fontWeight: '800',
            color: '#111827',
            lineHeight: '1.2',
            marginBottom: '20px',
          }}>
            Start trading with zero brokerage.
          </h1>
          
          <p style={{
            fontSize: '1.1rem',
            color: '#555',
            lineHeight: '1.6',
            marginBottom: '32px',
          }}>
            Open your account in minutes and experience the fastest, most reliable trading platform in India.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { icon: '🚀', text: 'Zero brokerage on equity delivery' },
              { icon: '⚡', text: 'Instant access to all products' },
              { icon: '🔒', text: 'Bank-grade security encryption' }
            ].map((feature, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}>
                  {feature.icon}
                </div>
                <span style={{ fontSize: '1.05rem', color: '#374151', fontWeight: '500' }}>
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <div style={{
          flex: '1 1 400px',
          maxWidth: '460px',
          background: '#fff',
          borderRadius: '24px',
          boxShadow: '0 16px 48px rgba(0,0,0,0.08)',
          padding: '48px 40px',
        }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#111827', marginBottom: '8px' }}>
            Create Account
          </h2>
          <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '28px' }}>
            Fill in your details to get started.
          </p>

          {error && (
            <div style={{ background: '#fef2f2', color: '#dc2626', padding: '12px 16px', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '24px', border: '1px solid #fecaca' }}>
              {error}
            </div>
          )}
          
          {success && (
            <div style={{ background: '#f0fdf4', color: '#166534', padding: '12px 16px', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '24px', border: '1px solid #bbf7d0' }}>
              {success}
            </div>
          )}

          <form onSubmit={handleSignup}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                Full Name
              </label>
              <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Enter your full name" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
            </div>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  Email
                </label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@email.com" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  Mobile
                </label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="10-digit number" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
              </div>
            </div>

            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                Password
              </label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a secure password" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
            </div>

            <button
              type="submit"
              style={{ width: '100%', background: '#4f46e5', color: '#fff', border: 'none', padding: '14px', borderRadius: '10px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s, transform 0.1s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#4338ca'}
              onMouseLeave={e => e.currentTarget.style.background = '#4f46e5'}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Start Investing Now
            </button>
          </form>

          <div style={{ marginTop: '28px', textAlign: 'center', fontSize: '0.95rem', color: '#6b7280' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#4f46e5', fontWeight: '600', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
              Login here
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Signup;