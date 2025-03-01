const Joi = require("joi");
const responseHandler = require("./responseHandler");

/**
 * Validation Middleware
 * @param {Object} schema - Joi validation schema
 * @param {String} property - Request property to validate (body, query, params)
 * @returns {Function} - Express middleware function
 */
const validate = (schema, property = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => ({
        field: err.context.key,
        message: err.message.replace(/['"]/g, ""),
      }));

      return responseHandler.validationError(res, "Validation failed", errors);
    }

    next();
  };
};

module.exports = validate;
