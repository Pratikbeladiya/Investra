import React from 'react';
import '../../styles/global/Common.css';

const StockButton = ({ onClick, type, children }) => {
  return (
    <button
      className={`stock-btn stock-btn-${type.toLowerCase()}`}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
};

export default StockButton;
