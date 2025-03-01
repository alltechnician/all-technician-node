const Joi = require("joi");


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

  // Create Segment Validation
const segmentSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  image: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
  locationIds: Joi.array().items(Joi.string().guid({ version: "uuidv4" })).required(),
});

// Update Segment Validation (Allow optional updates)
const updateSegmentSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  image: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
  locationIds: Joi.array().items(Joi.string().guid({ version: "uuidv4" })).optional(),
}).min(1);

module.exports = { segmentSchema, updateSegmentSchema, idParamSchema };
