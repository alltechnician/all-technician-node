const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const AdminUser = require("./adminUser");
const Role = require("./role");

const AdminUserRole = sequelize.define(
  "AdminUserRole",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    roleId: {
      type: DataTypes.UUID,
      references: {
        model: Role,
        key: "id",
      },
    },
    adminUserId: {
      type: DataTypes.UUID,
      references: {
        model: AdminUser,
        key: "id",
      },
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
  }
);

// Define associations
AdminUser.belongsTo(Role, { through: AdminUserRole, foreignKey: "roleId" });
Role.belongsTo(AdminUser, {
  through: AdminUserRole,
  foreignKey: "adminUserId",
});

module.exports = AdminUserRole;
