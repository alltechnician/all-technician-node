const { Role, RolePermission, Permission } = require("../../models");
const { NotFoundError, ValidationError } = require("../../utils/customErrors");

/**
 * Create a new role
 * @param {Object} roleData - Data for new role
 */
const createRole = async (roleData) => {
  const { roleName, permissions } = roleData;

  // Check if role already exists
  const existingRole = await Role.findOne({
    where: { roleName, isDeleted: false },
  });
  if (existingRole) throw new ValidationError("Role already exists");

  // Start a transaction
  const transaction = await Role.sequelize.transaction();
  try {
    // Create the role
    const role = await Role.create({ roleName }, { transaction });

    // If permissions are provided, check and insert only new ones
    if (permissions && Array.isArray(permissions) && permissions.length > 0) {
      // Fetch existing permissions for the role
      const existingPermissions = await RolePermission.findAll({
        where: { roleId: role.id },
        attributes: ["permissionId"],
        raw: true,
      });

      // Extract existing permission IDs
      const existingPermissionIds = existingPermissions.map(
        (rp) => rp.permissionId
      );

      // Filter out already assigned permissions
      const newPermissions = permissions.filter(
        (permissionId) => !existingPermissionIds.includes(permissionId)
      );

      // Bulk insert only new permissions
      if (newPermissions.length > 0) {
        const rolePermissions = newPermissions.map((permissionId) => ({
          roleId: role.id,
          permissionId,
        }));
        await RolePermission.bulkCreate(rolePermissions, { transaction });
      }
    }

    // Commit transaction
    await transaction.commit();
    return role;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

/**
 * Get all roles
 */
const getAllRoles = async () => {
  return await Role.findAll({
    where: { isDeleted: false },
    order: [["createdAt", "DESC"]],
  });
};

/**
 * Get a single role by ID
 */
const getRoleById = async (id) => {
  const role = await Role.findOne({
    where: { id, isDeleted: false },
    include: [
      {
        model: Permission,
        through: { attributes: [] }, // Hide the join table fields
        attributes: ["id", "permission", "module", "screen", "permissionId"],
      },
    ],
  });

  if (!role) {
    throw new NotFoundError("Role not found");
  }

  return role;
};

/**
 * Update a role
 */
const updateRole = async (id, roleData) => {
  const { roleName, permissions } = roleData;

  // Start a transaction
  const transaction = await Role.sequelize.transaction();
  try {
    // Fetch the role
    const role = await Role.findOne({
      where: { id, isDeleted: false },
      transaction,
    });
    if (!role) throw new NotFoundError("Role not found");

    // Update role name if provided
    if (roleName) {
      const existingRole = await Role.findOne({ where: { roleName } });
      if (existingRole) throw new ValidationError("Role already exists");
      role.roleName = roleName;
      await role.save({ transaction });
    }

    // If permissions are provided, update role_permissions
    if (permissions && Array.isArray(permissions)) {
      // Fetch valid permissions
      const validPermissions = await Permission.findAll({
        where: { id: permissions },
        attributes: ["id"],
        raw: true,
        transaction,
      });

      const validPermissionIds = validPermissions.map((p) => p.id);

      // Remove all existing role_permissions for this role
      await RolePermission.destroy({ where: { roleId: id }, transaction });

      // Insert only new valid permissions
      if (validPermissionIds.length > 0) {
        const rolePermissions = validPermissionIds.map((permissionId) => ({
          roleId: id,
          permissionId,
        }));
        await RolePermission.bulkCreate(rolePermissions, { transaction });
      }
    }

    // Commit transaction
    await transaction.commit();
    return role;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

/**
 * Soft delete a role
 */
const deleteRole = async (id) => {
  // Start a transaction
  const transaction = await Role.sequelize.transaction();
  try {
    // Fetch the role
    const role = await Role.findOne({
      where: { id, isDeleted: false },
      transaction,
    });
    if (!role) throw new NotFoundError("Role not found");

    // Soft delete the role
    await role.update({ isDeleted: true }, { transaction });

    // Remove all related entries from role_permissions
    await RolePermission.destroy({ where: { roleId: id }, transaction });

    // Commit transaction
    await transaction.commit();
    return { message: "Role deleted successfully" };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
