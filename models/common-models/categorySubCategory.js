const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const Category = require("./category");
const SubCategory = require("./subCategory");

const CategorySubCategory = sequelize.define(
  "category_sub_categories",
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
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    subCategoryId: {
      type: DataTypes.UUID,
      references: {
        model: SubCategory,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
    tableName: "category_sub_categories",
    indexes: [
      {
        unique: true,
        fields: ["categoryId", "subCategoryId"],
      },
    ],
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
