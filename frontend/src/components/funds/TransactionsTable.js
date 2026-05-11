import React from 'react';

const TransactionsTable = ({ transactions }) => {
  if (!transactions.length) {
    return <p className="mt-4 text-sm text-slate-500">Your transaction history is empty. Trades and funds movement appear here.</p>;
  }

  return (
    <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200">
      <table className="w-full text-left text-sm text-slate-700">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Activity</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id} className="border-t border-slate-200 hover:bg-slate-50">
              <td className="px-4 py-4 text-slate-800">{new Date(transaction.date).toLocaleDateString()}</td>
              <td className="px-4 py-4">{transaction.description}</td>
              <td className={`px-4 py-4 font-semibold ${transaction.amount >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {transaction.amount >= 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
              </td>
              <td className="px-4 py-4">₹{transaction.balance.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
