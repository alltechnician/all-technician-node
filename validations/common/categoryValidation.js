const Joi = require("joi");

const categorySchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.base": "Category name must be a string",
    "string.empty": "Category name is required",
    "string.min": "Category name must be at least 3 characters",
    "string.max": "Category name cannot exceed 50 characters",
    "any.required": "Category name is required",
  }),
  image: Joi.string().optional().messages({
    "string.base": "Image must be a string",
  }),
  isActive: Joi.boolean().optional(),
  isDeleted: Joi.boolean().optional(),
});

const idParamSchema = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }).required().messages({
    "any.required": "ID is required",
    "string.guid": "ID must be a valid UUID",
  }),
});

const updateCategorySchema = categorySchema.min(1).messages({
  "object.min": "At least one field must be provided for update",
});

module.exports = { categorySchema, updateCategorySchema, idParamSchema };
