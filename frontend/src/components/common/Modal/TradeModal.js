import React, { useState } from 'react';
import api from '../../../services/api';

const TradeModal = ({ stock, mode, onClose, onSuccess }) => {
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.post('/trade/order', {
        symbol: stock.symbol,
        side: mode,
        qty,
      });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not place trade.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-indigo-600">Trade order</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">{mode} {stock.symbol}</h2>
            <p className="mt-1 text-sm text-slate-500">Live price ₹{stock.price.toLocaleString()} | {stock.companyName}</p>
          </div>
          <button onClick={onClose} className="rounded-full bg-slate-100 px-3 py-2 text-slate-600 transition hover:bg-slate-200">Close</button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Order type</span>
              <input readOnly value={mode} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900" />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Quantity</span>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(event) => setQty(Number(event.target.value))}
                className="mt-2 w-full rounded-3xl border border-slate-200 px-4 py-3 text-slate-900"
              />
            </label>
          </div>

          <div className="rounded-3xl bg-slate-50 p-5 text-slate-700">
            <p className="text-sm">Order estimate</p>
            <p className="mt-2 text-2xl font-semibold">₹{(qty * stock.price).toLocaleString()}</p>
            <p className="mt-1 text-sm text-slate-500">Total amount will be deducted from your trading balance instantly on buy orders.</p>
          </div>

          {error && <p className="rounded-2xl bg-rose-50 p-4 text-sm text-rose-700">{error}</p>}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} className="rounded-3xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="rounded-3xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-400">
              {loading ? 'Placing order...' : `Confirm ${mode}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TradeModal;
