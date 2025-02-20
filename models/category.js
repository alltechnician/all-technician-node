const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: { type: DataTypes.STRING, allowNull: true },
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
  }
);

module.exports = Category;
