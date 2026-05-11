exports.successResponse = (res, data, statusCode = 200) => {
  res.status(statusCode).json(data);
};

exports.errorResponse = (res, message, statusCode = 500) => {
  res.status(statusCode).json({ message });
};
