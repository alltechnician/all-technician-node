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
      validate: {
        notEmpty: true,
      },
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
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
    tableName: "admin_user_session_logs",
    paranoid: true, // does not delete database entries, but adds a deletedAt column
    deletedAt: "deletedAt", // Use the default deletedAt column
    hooks: {
      beforeDestroy: (instance) => {
        instance.setDataValue("isDeleted", true);
      },
      beforeRestore: (instance) => {
        instance.setDataValue("isDeleted", false);
      },
    },
  }
);

// Define One-to-Many Relationship
AdminUser.hasMany(AdminUserSessionLogs, {
  foreignKey: "adminUserId",
  as: "sessionLogs",
});
AdminUserSessionLogs.belongsTo(AdminUser, {
  foreignKey: "adminUserId",
  as: "adminUser",
});

module.exports = AdminUserSessionLogs;
