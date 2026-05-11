import React from 'react';

const ProfilePanel = ({ profile }) => {
  return (
    <div className="rounded-3xl bg-slate-50 p-6 shadow-sm ring-1 ring-slate-200 sm:max-w-md">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Profile</p>
          <h3 className="mt-3 text-2xl font-semibold text-slate-900">{profile?.username || 'Trader'}</h3>
          <p className="mt-1 text-sm text-slate-500">{profile?.email || 'No email available'}</p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-indigo-100 text-indigo-700">
          {profile?.username?.charAt(0).toUpperCase() || 'T'}
        </div>
      </div>

      <div className="mt-6 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm text-slate-500">Available balance</p>
        <p className="mt-2 text-3xl font-semibold text-slate-900">₹{profile?.balance?.toLocaleString() || '0'}</p>
      </div>

      <p className="mt-4 text-sm text-slate-500">Account settings and profile features will be available here soon.</p>
    </div>
  );
};

export default ProfilePanel;
