const express = require("express");
const roleController = require("../../controllers/admin/roleController");
const { authenticate } = require("../../middlewares/authMiddleware");
const { asyncHandler } = require("../../utils/requestHandler");
const validate = require("../../utils/validationHandler")
const { createRoleSchema, updateRoleSchema,idParamSchema } = require("../../validations/admin/roleValidation");

const router = express.Router();

// Create a new role
router.post("/", authenticate, validate(createRoleSchema), asyncHandler(roleController.createRole));

// Get all roles
router.get("/", authenticate, asyncHandler(roleController.getAllRoles));

// Get a role by ID
router.get("/:id", authenticate,validate(idParamSchema, "params"),  asyncHandler(roleController.getRoleById));

// Update a role
router.put("/:id", authenticate, validate(idParamSchema, "params"), validate(updateRoleSchema, "body"), asyncHandler(roleController.updateRole));

// Delete a role (soft delete)
router.delete("/:id", authenticate, validate(idParamSchema, "params"),  asyncHandler(roleController.deleteRole));

module.exports = router;
