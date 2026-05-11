import React from 'react';

const HoldingsTable = ({ holdings }) => {
  if (!holdings.length) {
    return <p className="mt-4 text-sm text-slate-500">No holdings available yet. Execute a trade to build your portfolio.</p>;
  }

  return (
    <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200">
      <table className="w-full text-left text-sm text-slate-700">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th className="px-4 py-3">Symbol</th>
            <th className="px-4 py-3">Qty</th>
            <th className="px-4 py-3">Avg. Price</th>
            <th className="px-4 py-3">LTP</th>
            <th className="px-4 py-3">Value</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((holding) => {
            const value = holding.latestPrice * holding.qty;
            return (
              <tr key={holding.symbol} className="border-t border-slate-200 hover:bg-slate-50">
                <td className="px-4 py-4 font-medium text-slate-900">{holding.symbol}</td>
                <td className="px-4 py-4">{holding.qty}</td>
                <td className="px-4 py-4">₹{holding.avgPrice.toLocaleString()}</td>
                <td className="px-4 py-4">₹{holding.latestPrice.toLocaleString()}</td>
                <td className="px-4 py-4">₹{value.toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HoldingsTable;
