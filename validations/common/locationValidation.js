const Joi = require("joi");

// Create Location Validation
const locationSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.base": "Location name must be a string",
    "string.empty": "Location name is required",
    "string.min": "Location name must be at least 3 characters",
    "string.max": "Location name cannot exceed 50 characters",
    "any.required": "Location name is required",
  }),
  isActive: Joi.boolean().optional(),
  isDeleted: Joi.boolean().optional(),
});

// Validate `id` parameter (UUID v4)
const idParamSchema = Joi.object({
  id: Joi.string()
    .guid({ version: "uuidv4" }) // Ensures it's a valid UUID v4
    .required()
    .messages({
      "any.required": "ID is required",
      "string.guid": "ID must be a valid UUID",
    }),
});

// Update Location Validation (At least one field must be provided)
const updateLocationSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional().messages({
    "string.base": "Location name must be a string",
    "string.min": "Location name must be at least 3 characters",
    "string.max": "Location name cannot exceed 50 characters",
  }),
  isActive: Joi.boolean().optional(),
  isDeleted: Joi.boolean().optional(),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update",
  });

module.exports = { locationSchema, updateLocationSchema, idParamSchema };
