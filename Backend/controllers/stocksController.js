const Stock = require('../models/Stock');
const stockData = require('../seed/stockData');

exports.getStocks = async (req, res, next) => {
  try {
    let stocks = await Stock.find({ symbol: { $nin: ['NIFTY', 'BANKNIFTY', 'FINNIFTY'] } }).sort({ symbol: 1 });
    if (stocks.length === 0) {
      stocks = stockData.filter(stock => !['NIFTY', 'BANKNIFTY', 'FINNIFTY'].includes(stock.symbol));
    }
    res.json(stocks);
  } catch (err) {
    next(err);
  }
};

exports.getIndices = async (req, res, next) => {
  try {
    const symbols = ['NIFTY 50', 'BANKNIFTY', 'FINNIFTY', 'SENSEX'];
    let indices = await Stock.find({ symbol: { $in: symbols } }).sort({ symbol: 1 });
    if (indices.length === 0) {
      indices = stockData.filter((stock) => symbols.includes(stock.symbol));
    }
    res.json(indices);
  } catch (err) {


    next(err);
  }
};
