const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const AdminUser = require("./adminUser");
const Role = require("./role");

const AdminUserRole = sequelize.define(
  "admin_user_role",
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
    adminUserId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: AdminUser,
        key: "id",
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
    tableName: "admin_user_role",
    indexes: [
      {
        unique: true,
        fields: ["roleId", "adminUserId"],
      },
    ],
  }
);


module.exports = AdminUserRole;
