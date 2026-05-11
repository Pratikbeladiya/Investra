const User = require('../models/User');
const Stock = require('../models/Stock');
const Holding = require('../models/Holding');
const Order = require('../models/Order');
const Transaction = require('../models/Transaction');

const safeNumber = (value) => Number(Number(value) || 0);

exports.getHoldings = async (req, res, next) => {
  try {
    const holdings = await Holding.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    res.json(holdings);
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    next(err);
  }
};

exports.placeOrder = async (req, res, next) => {
  try {
    const { symbol, qty, side } = req.body;
    const normalizedSymbol = String(symbol || '').toUpperCase().trim();
    const quantity = safeNumber(qty);
    const orderSide = String(side || '').toUpperCase();

    if (!normalizedSymbol || !quantity || !['BUY', 'SELL'].includes(orderSide)) {
      return res.status(400).json({ message: 'Symbol, quantity and order side are required.' });
    }

    if (quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be greater than zero.' });
    }

    const stock = await Stock.findOne({ symbol: normalizedSymbol });
    if (!stock) {
      return res.status(404).json({ message: 'Stock not found.' });
    }

    const totalAmount = Number((stock.price * quantity).toFixed(2));
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({ message: 'Authenticated user not found.' });
    }

    let holding = await Holding.findOne({ userId: user._id, stockSymbol: normalizedSymbol });
    let profitLoss = 0;

    if (orderSide === 'BUY') {
      if (user.balance < totalAmount) {
        return res.status(400).json({ message: 'Insufficient balance to complete the purchase.' });
      }
      user.balance = Number((user.balance - totalAmount).toFixed(2));

      if (holding) {
        const currentValue = holding.avgPrice * holding.qty;
        const newQty = holding.qty + quantity;
        const newAvg = (currentValue + totalAmount) / newQty;
        holding.qty = newQty;
        holding.avgPrice = Number(newAvg.toFixed(2));
        holding.latestPrice = stock.price;
      } else {
        holding = new Holding({
          userId: user._id,
          stockSymbol: normalizedSymbol,
          companyName: stock.companyName,
          qty: quantity,
          avgPrice: stock.price,
          latestPrice: stock.price,
        });
      }
    } else {
      if (!holding || holding.qty < quantity) {
        return res.status(400).json({ message: 'Not enough holdings to sell.' });
      }
      profitLoss = Number(((stock.price - holding.avgPrice) * quantity).toFixed(2));
      user.balance = Number((user.balance + totalAmount).toFixed(2));
      holding.qty -= quantity;
      holding.latestPrice = stock.price;
      if (holding.qty === 0) {
        await holding.deleteOne();
        holding = null;
      }
    }

    const order = await Order.create({
      userId: user._id,
      stockSymbol: normalizedSymbol,
      companyName: stock.companyName,
      qty: quantity,
      price: stock.price,
      side: orderSide,
      total: totalAmount,
    });

    await Transaction.create({
      userId: user._id,
      stockSymbol: normalizedSymbol,
      companyName: stock.companyName,
      type: orderSide,
      qty: quantity,
      price: stock.price,
      total: totalAmount,
      profitLoss,
    });

    await user.save();
    if (holding) {
      await holding.save();
    }

    res.json({ message: 'Order processed successfully.', order, balance: user.balance });
  } catch (err) {
    next(err);
  }
};
