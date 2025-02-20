const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Category = require("./category");
const SubCategory = require("./subCategory");

const CategorySubCategory = sequelize.define(
  "CategorySubCategory",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.UUID,
      references: {
        model: Category,
        key: "id",
      },
    },
    subCategoryId: {
      type: DataTypes.UUID,
      references: {
        model: SubCategory,
        key: "id",
      },
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
  }
);

// Define associations
Category.belongsToMany(SubCategory, {
  through: CategorySubCategory,
  foreignKey: "categoryId",
});
SubCategory.belongsToMany(Category, {
  through: CategorySubCategory,
  foreignKey: "subCategoryId",
});

module.exports = CategorySubCategory;
