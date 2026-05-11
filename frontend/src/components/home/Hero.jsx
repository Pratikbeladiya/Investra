import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/home/Hero.css';

function Hero() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-flex">
          <div className="hero-text-content">
            <p className="hero-subtitle">
              Trade better with confidence
            </p>
            <h1 className="hero-title">
              A professional brokerage platform built for modern investors.
            </h1>
            <p className="hero-description">
              Investra gives you fast orders, clear pricing, and powerful market insights so you can invest with certainty instead of noise.
            </p>

            <div className="hero-cta-group">
              <Link to="/signup" className="btn-primary-custom">
                Create account
              </Link>
              <Link to="/pricing" className="btn-secondary-custom">
                View pricing
              </Link>
            </div>

            <div className="hero-features-grid">
              <div className="feature-card">
                <p className="feature-title">₹0 delivery brokerage</p>
                <p className="feature-text">
                  Invest in stocks and mutual funds with zero delivery charges.
                </p>
              </div>
              <div className="feature-card">
                <p className="feature-title">Fast order execution</p>
                <p className="feature-text">
                  Execute trades instantly across equities, derivatives and funds.
                </p>
              </div>
              <div className="feature-card">
                <p className="feature-title">Clear pricing</p>
                <p className="feature-text">
                  No hidden fees. Just transparent, predictable brokerage.
                </p>
              </div>
            </div>
          </div>

          <div className="hero-image-container">
            <img src="media/images/homeHero.png" alt="Investra trading dashboard preview" className="hero-image" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
