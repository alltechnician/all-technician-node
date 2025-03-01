const Joi = require("joi");

const registerSchema = Joi.object({
  fullName: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  phoneNumber: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .required(),
  isMasterAdmin: Joi.boolean().optional(),
  profileImage: Joi.string()
    .uri()
    .pattern(/\.(jpeg|jpg|png|gif)$/i)
    .optional()
    .allow(null),
  roleId: Joi.string()
    .guid({ version: "uuidv4" }) // Ensures UUID v4 format
    .required()
    .messages({
      "any.required": "roleId is required",
      "string.guid": "roleId must be a valid UUID",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const getUUIDSchema = Joi.object({
  id: Joi.string()
    .guid({ version: "uuidv4" }) // Ensures UUID v4 format
    .required()
    .messages({
      "any.required": "id is required",
      "string.guid": "id must be a valid UUID",
    }),
});

module.exports = { registerSchema, loginSchema, getUUIDSchema };
