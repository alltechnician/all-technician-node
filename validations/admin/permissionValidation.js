const Joi = require("joi");

const permissionSchema = Joi.object({
  permission: Joi.string().min(3).max(50).required().messages({
    "string.base": "Permission must be a string",
    "string.empty": "Permission is required",
    "string.min": "Permission must be at least 3 characters",
    "string.max": "Permission cannot exceed 50 characters",
    "any.required": "Permission is required",
  }),
  module: Joi.string().min(3).max(50).required().messages({
    "string.base": "Module must be a string",
    "string.empty": "Module is required",
    "string.min": "Module must be at least 3 characters",
    "string.max": "Module cannot exceed 50 characters",
    "any.required": "Module is required",
  }),
  screen: Joi.string().min(3).max(50).required().messages({
    "string.base": "Screen must be a string",
    "string.empty": "Screen is required",
    "string.min": "Screen must be at least 3 characters",
    "string.max": "Screen cannot exceed 50 characters",
    "any.required": "Screen is required",
  }),
  permissionId: Joi.string().alphanum().min(3).max(20).required().messages({
    "string.base": "Permission ID must be a string",
    "string.empty": "Permission ID is required",
    "string.alphanum": "Permission ID must only contain letters and numbers",
    "string.min": "Permission ID must be at least 3 characters",
    "string.max": "Permission ID cannot exceed 20 characters",
    "any.required": "Permission ID is required",
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
        "any.required": "id is required",
        "string.guid": "id must be a valid UUID",
      }),
  });
  
  // Validate the request body fields
  const updatePermissionSchema = Joi.object({
    permission: Joi.string().min(3).max(50).optional().messages({
      "string.base": "Permission must be a string",
      "string.min": "Permission must be at least 3 characters",
      "string.max": "Permission cannot exceed 50 characters",
    }),
    module: Joi.string().min(3).max(50).optional().messages({
      "string.base": "Module must be a string",
      "string.min": "Module must be at least 3 characters",
      "string.max": "Module cannot exceed 50 characters",
    }),
    screen: Joi.string().min(3).max(50).optional().messages({
      "string.base": "Screen must be a string",
      "string.min": "Screen must be at least 3 characters",
      "string.max": "Screen cannot exceed 50 characters",
    }),
    permissionId: Joi.string().alphanum().min(3).max(20).optional().messages({
      "string.base": "Permission ID must be a string",
      "string.alphanum": "Permission ID must only contain letters and numbers",
      "string.min": "Permission ID must be at least 3 characters",
      "string.max": "Permission ID cannot exceed 20 characters",
    }),
    isActive: Joi.boolean().optional(),
    isDeleted: Joi.boolean().optional(),
  }).min(1) // Ensures at least one field is provided for update
    .messages({
      "object.min": "At least one field must be provided for update",
    });

module.exports = { permissionSchema,updatePermissionSchema,idParamSchema };
