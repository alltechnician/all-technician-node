const { Permission } = require("../../models");
const { NotFoundError, ValidationError } = require("../../utils/customErrors");

const createPermission = async (data) => {
  const { permission, module, screen, permissionId } = data;

  // Check if permissionId already exists
  const existingPermission = await Permission.findOne({
    where: { permissionId },
  });
  if (existingPermission)
    throw new ValidationError("Permission ID already exists");

  const newPermission = await Permission.create({
    permission,
    module,
    screen,
    permissionId,
  });
  return newPermission;
};

const listPermissions = async () => {
  return await Permission.findAll({ where: { isDeleted: false } });
};

const getPermissionById = async (id) => {
  const permission = await Permission.findOne({
    where: { id, isDeleted: false },
  });
  if (!permission) throw new NotFoundError("Permission not found");
  return permission;
};

const updatePermission = async (id, data) => {
  const permission = await Permission.findByPk(id);
  if (!permission) throw new NotFoundError("Permission not found");

  await permission.update(data);
  return permission;
};

const deletePermission = async (id) => {
  const permission = await Permission.findByPk(id);
  if (!permission) throw new NotFoundError("Permission not found");

  await permission.update({ isDeleted: true });
  return { message: "Permission deleted successfully" };
};

module.exports = {
  createPermission,
  listPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
};
