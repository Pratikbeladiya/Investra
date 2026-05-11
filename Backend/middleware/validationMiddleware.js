const validationMiddleware = (schema) => {
  return (req, res, next) => {
    if (schema) {
      const { error } = schema(req.body);
      if (error) {
        return res.status(400).json({ message: error });
      }
    }
    next();
  };
};

module.exports = validationMiddleware;
