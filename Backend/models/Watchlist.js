const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema(
  {
    symbol: { type: String, required: true, unique: true, uppercase: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    price: { type: Number, required: true, default: 0 },
    change: { type: Number, required: true, default: 0 },
    percent: { type: Number, required: true, default: 0 },
    volume: { type: Number, required: true, default: 0 },
    high: { type: Number, required: true, default: 0 },
    low: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Stock', StockSchema);
