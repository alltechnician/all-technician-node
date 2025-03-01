const Joi = require("joi");


const createRoleSchema = Joi.object({
  roleName: Joi.string().min(3).max(50).required().messages({
    "string.base": "Role name must be a string",
    "string.empty": "Role name is required",
    "string.min": "Role name must be at least 3 characters",
    "string.max": "Role name cannot exceed 50 characters",
    "any.required": "Role name is required",
  }),
  isActive: Joi.boolean().optional(),
  permissions: Joi.array()
    .items(
      Joi.string().guid({ version: "uuidv4" }).messages({
        "string.guid": "Each permission must be a valid UUID",
        "string.base": "Each permission must be a string",
      })
    )
    .min(1) // At least one permission is required
    .unique() // Ensures no duplicate permission IDs
    .required()
    .messages({
      "array.base": "Permissions must be an array",
      "array.min": "At least one permission ID is required",
      "array.unique": "Duplicate permission IDs are not allowed",
      "any.required": "Permissions are required",
    }),

});

const updateRoleSchema = Joi.object({
  roleName: Joi.string().min(3).max(50).optional().messages({
    "string.base": "Role name must be a string",
    "string.min": "Role name must be at least 3 characters",
    "string.max": "Role name cannot exceed 50 characters",
  }),
  isActive: Joi.boolean().optional(),
  isDeleted: Joi.boolean().optional(),
  permissions: Joi.array()
  .items(
    Joi.string().guid({ version: "uuidv4" }).messages({
      "string.guid": "Each permission must be a valid UUID",
      "string.base": "Each permission must be a string",
    })
  )
  .min(1) // At least one permission is required
  .unique() // Ensures no duplicate permission IDs
  .optional()
  .messages({
    "array.base": "Permissions must be an array",
    "array.min": "At least one permission ID is required",
    "array.unique": "Duplicate permission IDs are not allowed",
    "any.required": "Permissions are required",
  }),
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

module.exports = { createRoleSchema, updateRoleSchema,idParamSchema };
