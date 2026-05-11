import React from 'react';
import '../../styles/dashboard/HoldingsCard.css';

const HoldingsCard = ({ profile }) => {
  const isProfit = (profile?.profitLoss || 0) >= 0;
  const percent = profile?.totalInvestment > 0 
    ? ((profile.profitLoss / profile.totalInvestment) * 100).toFixed(2) 
    : "0.00";

  return (
    <div className="holdings-card-wrapper">
      <div className="holdings-card-header">
        <span className="holdings-card-title">Holdings</span>
      </div>
      <div className="holdings-card-body">
        <div style={{ marginBottom: "16px" }}>
          <h2 className={`holdings-card-amount ${isProfit ? 'positive' : 'negative'}`}>
            {isProfit ? "+" : ""}
            {(profile?.profitLoss || 0).toLocaleString("en-IN")}
            <small className="holdings-card-percent">
              {percent}%
            </small>
          </h2>
          <p className="holdings-card-label">P&L</p>
        </div>
        <div className="holdings-card-divider"></div>
        <div className="holdings-card-stats">
          <div>
            <p className="holdings-stat-label">Current Value</p>
            <p className="holdings-stat-value">₹{(profile?.currentValue || 0).toLocaleString("en-IN")}</p>
          </div>
          <div>
            <p className="holdings-stat-label">Investment</p>
            <p className="holdings-stat-value">₹{(profile?.totalInvestment || 0).toLocaleString("en-IN")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoldingsCard;
