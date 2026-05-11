const Holding = require('../models/Holdings');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/responseHandler');

exports.getProfile = asyncHandler(async (req, res) => {
  const holdings = await Holding.find({ userId: req.user._id });
  const totalInvestment = holdings.reduce((sum, holding) => sum + holding.avgPrice * holding.qty, 0);
  const currentValue = holdings.reduce((sum, holding) => sum + holding.latestPrice * holding.qty, 0);
  const profitLoss = Number((currentValue - totalInvestment).toFixed(2));
  const allocation = holdings.map((holding) => ({
    symbol: holding.stockSymbol,
    companyName: holding.companyName,
    allocation: Number(((holding.latestPrice * holding.qty) / (currentValue || 1) * 100).toFixed(2)),
  }));

  successResponse(res, {
    username: req.user.username,
    email: req.user.email,
    balance: req.user.balance,
    totalInvestment: Number(totalInvestment.toFixed(2)),
    currentValue: Number(currentValue.toFixed(2)),
    profitLoss,
    allocation,
  });
});
