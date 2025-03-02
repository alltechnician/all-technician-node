const jwt = require("jsonwebtoken");
const responseHandler = require("../utils/responseHandler");
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

const authenticate = (req, res, next) => {
  let token;

  if (process.env.NODE_ENV === "production") {
    token = req.cookies.accessToken;
  } else {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }

  if (!token) {
    logger.warn("Unauthorized Access: Missing access token");
    return responseHandler.unauthorized(res, "Access token required");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error(`Invalid or expired token: ${error.message}`);
    return responseHandler.unauthorized(res, "Invalid or expired access token");
  }
};

module.exports = { authenticate };
