const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Permission = require("./permission");
const Role = require("./role");

const RolePermission = sequelize.define(
  "RolePermission",
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
    permissionId: {
      type: DataTypes.UUID,
      references: {
        model: Permission,
        key: "id",
      },
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
  }
);

// Define associations
Permission.belongsTo(Role, { through: RolePermission, foreignKey: "roleId" });
Role.belongsTo(Permission, {
  through: RolePermission,
  foreignKey: "permissionId",
});

module.exports = RolePermission;
