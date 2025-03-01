const responseHandler = require("../utils/responseHandler");
const winston = require("winston");

// Configure Winston Logger
const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/errors.log", level: "error" }),
  ],
});

/**
 * Centralized Express Error Handler Middleware
 * @param {Object} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const errorHandler = (err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    timestamp: new Date().toISOString(),
  });

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Show stack trace only in development
  const errorResponse = {
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  };

  return res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;
