const { asyncHandler, handleServiceCall } = require("../../utils/requestHandler");
const permissionService = require("../../services/admin/permissionService");

const createPermission = asyncHandler(async (req, res) => {
  await handleServiceCall(res, permissionService.createPermission, [req.body]);
});

const listPermissions = asyncHandler(async (req, res) => {
  await handleServiceCall(res, permissionService.listPermissions, []);
});

const getPermissionById = asyncHandler(async (req, res) => {
  await handleServiceCall(res, permissionService.getPermissionById, [req.params.id]);
});

const updatePermission = asyncHandler(async (req, res) => {
  await handleServiceCall(res, permissionService.updatePermission, [req.params.id, req.body]);
});

const deletePermission = asyncHandler(async (req, res) => {
  await handleServiceCall(res, permissionService.deletePermission, [req.params.id]);
});

module.exports = { createPermission, listPermissions, getPermissionById, updatePermission, deletePermission };
