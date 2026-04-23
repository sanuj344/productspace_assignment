const { validationResult } = require('express-validator');
const AppError = require('../utils/AppError');

/**
 * Middleware to run after express-validator chains.
 * Collects all errors and sends a formatted 422 response.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((e) => e.msg).join(', ');
    return next(new AppError(messages, 422));
  }
  next();
};

module.exports = { validate };
