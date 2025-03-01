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
    new winston.transports.File({ filename: "logs/app.log" }),
  ],
});

module.exports = {
  /**
   * Success Response
   * @param {Object} res - Express response object
   * @param {String} message - Success message
   * @param {Object} data - Response data
   * @param {Number} statusCode - HTTP status code (default: 200)
   */
  success: (res, message = "Success", data = {}, statusCode = 200) => {
    return res.status(statusCode).json({ success: true, message, data });
  },

  /**
   * Error Response
   * @param {Object} res - Express response object
   * @param {String} message - Error message
   * @param {Number} statusCode - HTTP status code (default: 400)
   */
  error: (res, message = "An error occurred", statusCode = 400) => {
    logger.error(`Error: ${message}`);
    return res.status(statusCode).json({ success: false, message });
  },

  /**
   * Validation Error Response
   * @param {Object} res - Express response object
   * @param {Array} errors - Array of validation errors
   * @param {Number} statusCode - HTTP status code (default: 422)
   */

  validationError: (res, message, errors) =>
    res.status(422).json({ success: false, message, errors }),

  /**
   * Unauthorized Response
   * @param {Object} res - Express response object
   * @param {String} message - Custom unauthorized message
   */
  unauthorized: (res, message = "Unauthorized access") => {
    logger.warn(`Unauthorized Access: ${message}`);
    return res.status(401).json({ success: false, message });
  },

  /**
   * Forbidden Response
   * @param {Object} res - Express response object
   * @param {String} message - Custom forbidden message
   */
  forbidden: (res, message = "Access forbidden") => {
    logger.warn(`Forbidden Access: ${message}`);
    return res.status(403).json({ success: false, message });
  },

  /**
   * Not Found Response
   * @param {Object} res - Express response object
   * @param {String} message - Custom not found message
   */
  notFound: (res, message = "Resource not found") => {
    logger.warn(`Not Found: ${message}`);
    return res.status(404).json({ success: false, message });
  },

  /**
   * Server Error Response
   * @param {Object} res - Express response object
   * @param {String} message - Custom server error message
   */
  serverError: (res, message = "Internal Server Error") => {
    logger.error(`Server Error: ${message}`);
    return res.status(500).json({ success: false, message });
  },
};
