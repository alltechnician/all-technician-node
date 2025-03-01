const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const RolePermission = require("./rolePermission");
const Role = require("./role");

const Permission = sequelize.define(
  "permissions",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    permission: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    module: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    screen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permissionId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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

// **Define Many-to-Many Relationship**
// Permission.belongsToMany(Role, {
//   through: RolePermission,
//   foreignKey: "permissionId",
//   otherKey: "roleId",
// });

module.exports = Permission;
