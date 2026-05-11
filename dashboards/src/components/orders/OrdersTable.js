import React from 'react';

const OrdersTable = ({ orders }) => {
  if (!orders.length) {
    return <p className="mt-4 text-sm text-slate-500">No orders placed yet. Use the watchlist to place your first trade.</p>;
  }

  return (
    <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200">
      <table className="w-full text-left text-sm text-slate-700">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Symbol</th>
            <th className="px-4 py-3">Qty</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-t border-slate-200 hover:bg-slate-50">
              <td className="px-4 py-4 font-medium text-slate-900">{order.type}</td>
              <td className="px-4 py-4">{order.symbol}</td>
              <td className="px-4 py-4">{order.qty}</td>
              <td className="px-4 py-4">₹{order.price.toLocaleString()}</td>
              <td className={`px-4 py-4 font-semibold ${order.status === 'COMPLETED' ? 'text-emerald-600' : 'text-amber-600'}`}>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
