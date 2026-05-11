const Holding = require('../models/Holdings');

exports.getHoldings = async (userId) => {
  return await Holding.find({ userId }).sort({ updatedAt: -1 });
};
