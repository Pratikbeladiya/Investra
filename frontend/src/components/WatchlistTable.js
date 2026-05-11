import React from 'react';

const WatchlistTable = ({ stocks, onTrade }) => {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Watchlist</h3>
          <p className="mt-2 text-sm text-slate-500">Track top movers and market favorites.</p>
        </div>
      </div>
      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">Symbol</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Change</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stocks.slice(0, 6).map((stock) => {
              const positive = stock.change >= 0;
              return (
                <tr key={stock.symbol} className="border-t border-slate-200 hover:bg-slate-50">
                  <td className="px-4 py-4 font-medium text-slate-900">{stock.symbol}</td>
                  <td className="px-4 py-4 text-slate-700">₹{stock.price.toLocaleString()}</td>
                  <td className={`px-4 py-4 font-semibold ${positive ? 'text-emerald-600' : 'text-rose-600'}`}>{positive ? '+' : ''}{stock.change.toFixed(2)}</td>
                  <td className="px-4 py-4 text-right">
                    <button onClick={() => onTrade(stock, 'BUY')} className="rounded-2xl bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700">
                      Buy
                    </button>
                    <button onClick={() => onTrade(stock, 'SELL')} className="ml-2 rounded-2xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200">
                      Sell
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WatchlistTable;
