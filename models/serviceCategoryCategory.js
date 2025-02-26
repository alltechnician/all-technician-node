const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Category = require("./category");
const ServiceCategory = require("./serviceCategory");

const ServiceCategoryCategory = sequelize.define(
  "ServiceCategoryCategory",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    serviceCategoryId: {
      type: DataTypes.UUID,
      references: {
        model: ServiceCategory,
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
ServiceCategory.belongsToMany(Category, {
  through: ServiceCategoryCategory,
  foreignKey: "serviceCategoryId",
});
Category.belongsToMany(ServiceCategory, {
  through: ServiceCategoryCategory,
  foreignKey: "categoryId",
});

module.exports = ServiceCategoryCategory;
