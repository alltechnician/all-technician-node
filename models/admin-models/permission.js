const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

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
      validate: {
        notEmpty: true,
      },
    },
    module: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    screen: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    permissionId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
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
    timestamps: true, // automatically adds createdAt and updatedAt fields
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

module.exports = Permission;
