const crypto = require('crypto');
const winston = require('winston');

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log' }),
  ],
});

const algorithm = 'aes-256-cbc';
const secretKey = process.env.ENCRYPTION_SECRET_KEY;

if (!secretKey || secretKey.length !== 32) {
  throw new Error('ENCRYPTION_SECRET_KEY must be 32 bytes long');
}

const encrypt = (text) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
};

const sendEncryptedResponse = (res, statusCode, response) => {
  const encryptedResponse = encrypt(JSON.stringify(response));
  res.status(statusCode).send(encryptedResponse);
};

module.exports = {
  success: (res, message = 'Success', data = {}, statusCode = 200) => {
    const response = { success: true, message, data };
    sendEncryptedResponse(res, statusCode, response);
  },
  error: (res, message = 'An error occurred', statusCode = 400) => {
    logger.error(`Error: ${message}`);
    const response = { success: false, message };
    sendEncryptedResponse(res, statusCode, response);
  },
  validationError: (res, message, errors) => {
    const response = { success: false, message, errors };
    sendEncryptedResponse(res, 422, response);
  },
  unauthorized: (res, message = 'Unauthorized access') => {
    logger.warn(`Unauthorized Access: ${message}`);
    const response = { success: false, message };
    sendEncryptedResponse(res, 401, response);
  },
  forbidden: (res, message = 'Access forbidden') => {
    logger.warn(`Forbidden Access: ${message}`);
    const response = { success: false, message };
    sendEncryptedResponse(res, 403, response);
  },
  notFound: (res, message = 'Resource not found') => {
    logger.warn(`Not Found: ${message}`);
    const response = { success: false, message };
    sendEncryptedResponse(res, 404, response);
  },
  serverError: (res, message = 'Internal Server Error') => {
    logger.error(`Server Error: ${message}`);
    const response = { success: false, message };
    sendEncryptedResponse(res, 500, response);
  },
};
