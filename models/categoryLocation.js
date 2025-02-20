const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Location = require("./location");
const Category = require("./category");

const LocationCategory = sequelize.define(
  "LocationCategory",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    locationId: {
      type: DataTypes.UUID,
      references: {
        model: Location,
        key: "id",
      },
    },
    categoryId: {
      type: DataTypes.UUID,
      references: {
        model: Category,
        key: "id",
      },
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
  }
);

// Define associations
Location.belongsToMany(Category, {
  through: LocationCategory,
  foreignKey: "locationId",
});
Category.belongsToMany(Location, {
  through: LocationCategory,
  foreignKey: "categoryId",
});

module.exports = LocationCategory;
