const watchlistService = require('../services/watchlistService');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/responseHandler');

exports.getStocks = asyncHandler(async (req, res) => {
  const stocks = await watchlistService.getStocks();
  successResponse(res, stocks);
});

exports.getIndices = asyncHandler(async (req, res) => {
  const indices = await watchlistService.getIndices();
  successResponse(res, indices);
});
