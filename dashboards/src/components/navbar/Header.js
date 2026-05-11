import React, { useState } from 'react';

const Header = ({ user, profile, onLogout }) => {
  const [open, setOpen] = useState(false);
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-indigo-600">Virtual Trading</p>
          <p className="mt-1 text-sm text-slate-500">Premium dashboard with live equity indices and portfolio analytics.</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-300"
          >
            <span>{user?.username || 'Trader'}</span>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">{(user?.username || 'T').charAt(0).toUpperCase()}</span>
          </button>

          {open && (
            <div className="absolute right-0 z-20 mt-3 w-72 rounded-3xl border border-slate-200 bg-white p-4 shadow-xl">
              <div className="space-y-3">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Portfolio value</p>
                  <p className="mt-1 text-xl font-semibold text-slate-900">₹{profile?.currentValue?.toLocaleString()}</p>
                  <p className="text-sm text-slate-500">Balance ₹{profile?.balance?.toLocaleString()}</p>
                </div>

                <button
                  onClick={onLogout}
                  className="w-full rounded-2xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-600"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
