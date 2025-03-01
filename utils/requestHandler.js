const responseHandler = require("./responseHandler");
const winston = require("winston");

// Configure Winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/errors.log", level: "error" }),
  ],
});

module.exports = {
  /**
   * Wraps async request handlers to catch errors automatically.
   * @param {Function} fn - Async function (controller/middleware)
   * @returns {Function} - Wrapped function with try-catch handling
   */
  asyncHandler: (fn) => async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      logger.error({
        message: error.message,
        stack: error.stack,
        url: req.originalUrl,
        method: req.method,
        ip: req.ip,
        timestamp: new Date().toISOString(),
      });
      next(error); // Pass error to Express error middleware
    }
  },

  /**
   * Handles service calls and catches errors for uniform response handling.
   * @param {Object} res - Express response object
   * @param {Function} serviceMethod - The service method to execute
   * @param {Array} params - Parameters for the service method
   */
  handleServiceCall: async (res, serviceMethod, params = []) => {
    try {
      const result = await serviceMethod(...params);
      return responseHandler.success(res, "Operation successful", result);
    } catch (error) {
      logger.error({
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
      });
      return responseHandler.error(res, error.message || "Something went wrong", 400);
    }
  },

  /**
   * Universal error handler for unhandled rejections and exceptions.
   */
  setupGlobalErrorHandlers: () => {
    process.on("unhandledRejection", (reason, promise) => {
      logger.error({
        message: "Unhandled Promise Rejection",
        reason,
        promise,
        timestamp: new Date().toISOString(),
      });
    });

    process.on("uncaughtException", (error) => {
      logger.error({
        message: "Uncaught Exception",
        stack: error.stack,
        timestamp: new Date().toISOString(),
      });
      process.exit(1); // Exit process to prevent further issues
    });
  },
};
