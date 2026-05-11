import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { saveAuth } from '../../services/authService';
import '../../styles/login/Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3002/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      saveAuth({ token: data.token, user: data.user });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <div className="login-card">
          {/* Header */}
          <div className="login-header">
            <h1>Welcome Back</h1>
            <p>Login to access your trading dashboard</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-alert">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input"
              />
            </div>

            <button type="submit" className="submit-btn">
              Login to Dashboard
            </button>
          </form>

          {/* Footer */}
          <div className="login-footer">
            Don't have an account?{' '}
            <Link to="/signup" className="signup-link">
              Sign up here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
