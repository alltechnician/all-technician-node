const SubCategory = require("../models/subCategory");
const Category = require("../models/category");
const CategorySubCategory = require("../models/categorySubCategory");

exports.addSubCategory = async (data) => {
  const category = await Category.findByPk(data.categoryId);
  if (!category) {
    throw new Error("Category not found");
  }

  const subCategory = await SubCategory.create(data);
  await CategorySubCategory.create({
    categoryId: category.id,
    subCategoryId: subCategory.id,
  });
  return subCategory;
};

exports.updateSubCategory = async (id, data) => {
  const subCategory = await SubCategory.findByPk(id);
  if (!subCategory) {
    throw new Error("SubCategory not found");
  }
  await subCategory.update(data);
  return subCategory;
};

exports.deleteSubCategory = async (id) => {
  const subCategory = await SubCategory.findByPk(id);
  if (!subCategory) {
    throw new Error("SubCategory not found");
  }
  await subCategory.update({ isDeleted: true });
  await CategorySubCategory.update(
    { isDeleted: true },
    { where: { subCategoryId: id } }
  );
  return subCategory;
};

exports.getAllSubCategories = async () => {
  const subCategories = await SubCategory.findAll({
    where: { isDeleted: false },
  });
  return subCategories;
};

exports.getSubCategoryById = async (id) => {
  const subCategory = await SubCategory.findByPk(id);
  if (!subCategory) {
    throw new Error("SubCategory not found");
  }
  return subCategory;
};
