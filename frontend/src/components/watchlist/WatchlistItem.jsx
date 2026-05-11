import React, { useState } from "react";
import '../../styles/watchlist/Watchlist.css';

const WatchlistItem = ({ stock, onOpenTransaction }) => {
  const [hovered, setHovered] = useState(false);
  const isProfit = stock.percent >= 0;

  return (
    <li
      className="watchlist-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="watchlist-item-content">
        {/* Symbol + company */}
        <div className="watchlist-symbol">
          <p className="watchlist-symbol-text">{stock.symbol}</p>
          {stock.companyName && (
            <p className="watchlist-company-text">{stock.companyName}</p>
          )}
        </div>

        {/* Price + percent — hide when hovered to show buttons */}
        <div className={`watchlist-right ${hovered ? 'is-hovered' : ''}`}>
          <div className="watchlist-price-wrap">
            <span className="watchlist-price-text">
              ₹{stock.price.toFixed(2)}
            </span>
            <span className={`watchlist-change-text ${isProfit ? 'positive' : 'negative'}`}>
              {isProfit ? "▲" : "▼"} {isProfit ? "+" : ""}{stock.percent}%
            </span>
          </div>

          {/* Buttons — revealed on hover */}
          <div className="watchlist-actions">
            <button
              className="wl-btn wl-btn-buy"
              onClick={(e) => { e.stopPropagation(); onOpenTransaction?.(stock.symbol, "BUY"); }}
            >
              B
            </button>
            <button
              className="wl-btn wl-btn-sell"
              onClick={(e) => { e.stopPropagation(); onOpenTransaction?.(stock.symbol, "SELL"); }}
            >
              S
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default WatchlistItem;
