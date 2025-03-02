const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

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
    indexes: [
      {
        unique: true,
        fields: ["roleName", "isDeleted"],
      },
    ],
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

module.exports = Role;
