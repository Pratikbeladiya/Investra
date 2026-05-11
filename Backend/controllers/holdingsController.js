const holdingsService = require('../services/holdingsService');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/responseHandler');

exports.getHoldings = asyncHandler(async (req, res) => {
  const holdings = await holdingsService.getHoldings(req.user._id);
  successResponse(res, holdings);
});
