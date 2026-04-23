/**
 * Wraps async route handlers to automatically forward errors to Express error middleware.
 * Eliminates repetitive try/catch blocks in controllers.
 */
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = catchAsync;
