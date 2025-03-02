const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Segment = sequelize.define(
  "segments",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
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
    indexes: [
      {
        unique: true,
        fields: ["name", "isDeleted"],
      },
    ],
  }
);

module.exports = Segment;
