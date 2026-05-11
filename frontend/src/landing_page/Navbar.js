import React from 'react';
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
      <div className="container d-flex align-items-center justify-content-between">
        {/* Branding */}
        <Link className="navbar-brand" to="/" style={{ textDecoration: 'none' }}>
          <span style={{ 
            fontSize: '1.6rem', 
            fontWeight: '800', 
            color: 'var(--text-main)', 
            letterSpacing: '-1px'
          }}>
            Investra<span style={{ color: 'var(--primary)' }}>.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link nav-link-custom" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-custom" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-custom" to="/pricing">Pricing</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-custom" to="/support">Support</Link>
            </li>
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="d-flex align-items-center gap-3">
          <Link to="/login" style={{ 
            textDecoration: 'none', 
            color: 'var(--text-main)', 
            fontWeight: '600',
            fontSize: '0.9rem',
            marginRight: '20px'
          }}>
            Login
          </Link>
          <Link to="/signup" className="btn-premium">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;