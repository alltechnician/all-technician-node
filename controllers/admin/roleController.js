const roleService = require("../../services/admin/roleService");
const { asyncHandler } = require("../../utils/requestHandler");

/**
 * Create a new role
 */
const createRole = asyncHandler(async (req, res) => {
  const role = await roleService.createRole(req.body);
  res.status(201).json({ success: true, data: role });
});

/**
 * Get all roles
 */
const getAllRoles = asyncHandler(async (req, res) => {
  const roles = await roleService.getAllRoles();
  res.json({ success: true, data: roles });
});

/**
 * Get a role by ID
 */
const getRoleById = asyncHandler(async (req, res) => {
  const role = await roleService.getRoleById(req.params.id);
  res.json({ success: true, data: role });
});

/**
 * Update a role
 */
const updateRole = asyncHandler(async (req, res) => {
  const updatedRole = await roleService.updateRole(req.params.id, req.body);
  res.json({ success: true, data: updatedRole });
});

/**
 * Soft delete a role
 */
const deleteRole = asyncHandler(async (req, res) => {
  await roleService.deleteRole(req.params.id);
  res.json({ success: true, message: "Role deleted successfully" });
});

module.exports = { createRole, getAllRoles, getRoleById, updateRole, deleteRole };
