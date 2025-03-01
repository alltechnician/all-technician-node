const AdminUser = require('./adminUser');
const AdminUserSessionLogs = require('./adminUserSessionLogs');
const AdminNotifications = require('./adminNotifications');

const Role = require('./role');
const Permission = require('./permission');
const RolePermission = require('./rolePermission');
const AdminUserRole = require('./adminUserRole');

// Define Many-to-Many Relationship between Role and Permission
Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: "roleId",
  otherKey: "permissionId",
});

Permission.belongsToMany(Role, {
  through: RolePermission,
  foreignKey: "permissionId",
  otherKey: "roleId",
});

// Define Many-to-Many Relationship between AdminUser and Role
AdminUser.belongsToMany(Role, {
  through: AdminUserRole,
  foreignKey: "adminUserId",
  otherKey: "roleId",
});

Role.belongsToMany(AdminUser, {
  through: AdminUserRole,
  foreignKey: "roleId",
  otherKey: "adminUserId",
});


const adminModels = {
    AdminUser,
    AdminUserSessionLogs,
    AdminNotifications,
    Role,
    AdminUserRole,
    Permission,
    RolePermission,
  };
  
module.exports = adminModels;