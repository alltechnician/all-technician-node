const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const AdminUser = require("./adminUser"); // Import AdminUser model

const AdminNotification = sequelize.define(
  "admin_notifications",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true, // Optional image
    },
    adminUserId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: AdminUser,
        key: "id",
      },
      onDelete: "CASCADE", // If admin is deleted, delete notifications
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.ENUM("unread", "read"),
      defaultValue: "unread",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
    tableName: "admin_notifications",
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

// **Define One-to-Many Relationship**
AdminUser.hasMany(AdminNotification, {
  foreignKey: "adminUserId",
  as: "notifications",
});
AdminNotification.belongsTo(AdminUser, {
  foreignKey: "adminUserId",
  as: "adminUser",
});

module.exports = AdminNotification;
