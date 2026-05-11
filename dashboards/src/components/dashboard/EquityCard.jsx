import React from 'react';
import '../../styles/dashboard/EquityCard.css';

const EquityCard = ({ balance }) => {
  return (
    <div className="equity-card-wrapper">
      <div className="equity-card-header">
        <span className="equity-card-title">Equity</span>
      </div>
      <div className="equity-card-body">
        <div style={{ marginBottom: "16px" }}>
          <h2 className="equity-card-amount">
            ₹{(balance || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </h2>
          <p className="equity-card-label">Margin available</p>
        </div>
        <div className="equity-card-divider"></div>
        <div className="equity-card-stats">
          <div>
            <p className="equity-stat-label">Margins used</p>
            <p className="equity-stat-value">₹0.00</p>
          </div>
          <div>
            <p className="equity-stat-label">Opening balance</p>
            <p className="equity-stat-value">
              ₹{(balance || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquityCard;
