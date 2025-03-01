const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const Permission = require("./permission");
const RolePermission = require("./rolePermission");

const Role = sequelize.define(
  "roles",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

// Import associations after model export
// setImmediate(() => {
//   const Permission = require("./permission");
//   const RolePermission = require("./rolePermission");

//   Role.belongsToMany(Permission, {
//     through: RolePermission,
//     foreignKey: "roleId",
//     otherKey: "permissionId",
//   });
// });

module.exports = Role;
