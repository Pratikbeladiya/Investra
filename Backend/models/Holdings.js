const mongoose = require('mongoose');

const HoldingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    stockSymbol: { type: String, required: true, uppercase: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    qty: { type: Number, required: true, min: 0 },
    avgPrice: { type: Number, required: true, min: 0 },
    latestPrice: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

HoldingSchema.index({ userId: 1, stockSymbol: 1 }, { unique: true });

module.exports = mongoose.model('Holding', HoldingSchema);
