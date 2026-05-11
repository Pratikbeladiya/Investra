import React from 'react';

const IndexPanel = ({ indexData }) => {
  const positive = indexData.change >= 0;
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">{indexData.companyName}</p>
          <h3 className="mt-4 text-3xl font-semibold text-slate-900">{indexData.symbol}</h3>
        </div>
        <span className={`rounded-2xl px-3 py-2 text-sm font-semibold ${positive ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
          {positive ? 'Live' : 'Drop'}
        </span>
      </div>

      <div className="mt-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-4xl font-semibold text-slate-900">{indexData.price.toLocaleString()}</p>
          <p className="mt-2 text-sm text-slate-500">Daily movement</p>
        </div>
        <div className="text-right">
          <p className={`text-lg font-semibold ${positive ? 'text-emerald-600' : 'text-rose-600'}`}>{positive ? '+' : ''}{indexData.change.toFixed(2)}</p>
          <p className={`text-sm ${positive ? 'text-emerald-600' : 'text-rose-600'}`}>{positive ? '+' : ''}{indexData.percent.toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
};

export default IndexPanel;
