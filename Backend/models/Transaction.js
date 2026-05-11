const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    stockSymbol: { type: String, uppercase: true, trim: true },
    companyName: { type: String, trim: true },
    type: { type: String, required: true, enum: ['BUY', 'SELL', 'DEPOSIT', 'WITHDRAWAL'] },
    qty: { type: Number, min: 1 },
    price: { type: Number, min: 0 },
    total: { type: Number, required: true, min: 0 },
    profitLoss: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', TransactionSchema);
