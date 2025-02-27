const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const AdminUser = require("./adminUser"); // Import AdminUser model

const AdminUserSessionLogs = sequelize.define(
  "admin_user_session_logs",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adminUserId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: AdminUser,
        key: "id",
      },
      onDelete: "CASCADE", // If admin user is deleted, delete session logs
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    dateTime: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
    tableName: "admin_user_session_logs",
  }
);

// **Define One-to-Many Relationship**
AdminUser.hasMany(AdminUserSessionLogs, {
  foreignKey: "adminUserId",
  as: "sessionLogs",
});
AdminUserSessionLogs.belongsTo(AdminUser, {
  foreignKey: "adminUserId",
  as: "adminUser",
});

module.exports = AdminUserSessionLogs;
