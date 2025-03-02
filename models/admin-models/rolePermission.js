const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const Permission = require("./permission");
const Role = require("./role");

const RolePermission = sequelize.define(
  "role_permissions",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Role,
        key: "id",
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    permissionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Permission,
        key: "id",
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    timestamps: true,
    tableName: "role_permissions",
    indexes: [
      {
        unique: true,
        fields: ["roleId", "permissionId"],
      },
    ],
  }
);


module.exports = RolePermission;
