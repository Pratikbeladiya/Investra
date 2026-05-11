const orderService = require('../services/orderService');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/responseHandler');

exports.getOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getOrders(req.user._id);
  successResponse(res, orders);
});

exports.placeOrder = asyncHandler(async (req, res) => {
  const { symbol, qty, side } = req.body;
  if (!symbol || !qty || !['BUY', 'SELL'].includes(String(side || '').toUpperCase())) {
    return res.status(400).json({ message: 'Symbol, quantity and order side are required.' });
  }

  if (Number(qty) <= 0) {
    return res.status(400).json({ message: 'Quantity must be greater than zero.' });
  }

  const result = await orderService.placeOrder(req.user._id, symbol, qty, side);
  res.json({ message: 'Order processed successfully.', order: result.order, balance: result.balance });
});
