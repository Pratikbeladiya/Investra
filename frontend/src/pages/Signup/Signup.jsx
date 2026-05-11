import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/signup/Signup.css';
import '../../styles/login/Login.css'; // Reusing some shared form styles

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
      const response = await fetch(`${process.env.REACT_APP_API_BASE || 'http://localhost:3002/api'}/auth/signup`, {
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

  return (
    <div className="signup-page-wrapper">
      <div className="signup-content-container">

        {/* Left Side: Value Proposition */}
        <div className="signup-info-section">
          <div className="badge-join">
            Join Us Today
          </div>
          
          <h1 className="signup-title">
            Start trading with zero brokerage.
          </h1>
          
          <p className="signup-subtitle">
            Open your account in minutes and experience the fastest, most reliable trading platform in India.
          </p>

          <div className="feature-list">
            {[
              'Zero brokerage on equity delivery',
              'Instant access to all products',
              'Bank-grade security encryption'
            ].map((feature, idx) => (
              <div key={idx} className="feature-item">
                • {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <div className="signup-form-card">
          <h2>Create Account</h2>
          <p>Fill in your details to get started.</p>

          {error && (
            <div className="error-alert">
              {error}
            </div>
          )}
          
          {success && (
            <div className="success-alert">
              {success}
            </div>
          )}

          <form onSubmit={handleSignup}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Enter your full name" className="form-input" />
            </div>

            <div className="form-row">
              <div>
                <label className="form-label">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@email.com" className="form-input" />
              </div>
              <div>
                <label className="form-label">Mobile</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="10-digit number" className="form-input" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a secure password" className="form-input" />
            </div>

            <button type="submit" className="signup-btn">
              Start Investing Now
            </button>
          </form>

          <div className="login-footer">
            Already have an account?{' '}
            <Link to="/login" className="signup-link">
              Login here
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Signup;
