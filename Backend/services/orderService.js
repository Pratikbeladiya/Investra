const Stock = require('../models/Watchlist');
const Holding = require('../models/Holdings');
const Order = require('../models/Order');
const Transaction = require('../models/Funds');
const User = require('../models/User');

const safeNumber = (value) => Number(Number(value) || 0);

exports.getOrders = async (userId) => {
  return await Order.find({ userId }).sort({ createdAt: -1 });
};

exports.placeOrder = async (userId, symbol, qty, side) => {
  const normalizedSymbol = String(symbol || '').toUpperCase().trim();
  const quantity = safeNumber(qty);
  const orderSide = String(side || '').toUpperCase();

  const stock = await Stock.findOne({ symbol: normalizedSymbol });
  if (!stock) {
    const err = new Error('Stock not found.'); err.status = 404; throw err;
  }

  const totalAmount = Number((stock.price * quantity).toFixed(2));
  const user = await User.findById(userId);
  if (!user) {
    const err = new Error('Authenticated user not found.'); err.status = 401; throw err;
  }

  let holding = await Holding.findOne({ userId: user._id, stockSymbol: normalizedSymbol });
  let profitLoss = 0;

  if (orderSide === 'BUY') {
    if (user.balance < totalAmount) {
      const err = new Error('Insufficient balance to complete the purchase.'); err.status = 400; throw err;
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
      const err = new Error('Not enough holdings to sell.'); err.status = 400; throw err;
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

  return { order, balance: user.balance };
};
