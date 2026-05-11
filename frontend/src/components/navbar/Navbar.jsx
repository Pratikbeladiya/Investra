import React from 'react';
import { Link } from "react-router-dom";
import "../../styles/navbar/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
      <div className="container d-flex align-items-center justify-content-between">
        <Link className="navbar-brand" to="/">
          <span className="navbar-brand-text">
            Investra<span className="navbar-brand-dot">.</span>
          </span>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>

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

        <div className="d-flex align-items-center gap-3">
          <Link to="/login" className="login-link">
            Login
          </Link>
          <Link to="/signup" className="get-started-btn">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
