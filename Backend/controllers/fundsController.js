const Transaction = require('../models/Funds');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/responseHandler');

exports.addFunds = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  if (!amount || Number(amount) <= 0) {
    return res.status(400).json({ message: 'Invalid amount' });
  }

  req.user.balance += Number(amount);
  await req.user.save();

  await Transaction.create({
    userId: req.user._id,
    type: 'DEPOSIT',
    total: Number(amount),
  });

  res.json({ message: 'Funds added successfully', balance: req.user.balance });
});

exports.withdrawFunds = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  if (!amount || Number(amount) <= 0) {
    return res.status(400).json({ message: 'Invalid amount' });
  }

  if (req.user.balance < amount) {
    return res.status(400).json({ message: 'Insufficient balance' });
  }

  req.user.balance -= Number(amount);
  await req.user.save();

  await Transaction.create({
    userId: req.user._id,
    type: 'WITHDRAWAL',
    total: Number(amount),
  });

  res.json({ message: 'Funds withdrawn successfully', balance: req.user.balance });
});

exports.getUserTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ 
    userId: req.user._id,
    type: { $in: ['DEPOSIT', 'WITHDRAWAL'] }
  }).sort({ createdAt: -1 });
  successResponse(res, transactions);
});

exports.getTradeTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user._id }).sort({ createdAt: -1 });
  successResponse(res, transactions);
});
