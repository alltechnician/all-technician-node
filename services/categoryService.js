const Category = require("../models/category");
const CategoryLocation = require("../models/categoryLocation");
const Location = require("../models/location");

exports.addCategory = async (data) => {
  const { name, isActive, isDeleted, locationId, image } = data;
  const location = await Location.findByPk(locationId);
  if (!location) {
    throw new Error("Location not found");
  }
  const category = await Category.create({ name, image, isActive, isDeleted });
  await CategoryLocation.create({
    locationId: location.id,
    categoryId: category.id,
  });
  return category;
};

exports.updateCategory = async (id, data) => {
  const category = await Category.findByPk(id);
  if (!category) {
    throw new Error("Category not found");
  }
  await category.update(data);
  return category;
};

exports.deleteCategory = async (id) => {
  const category = await Category.findByPk(id);
  if (!category) {
    throw new Error("Category not found");
  }
  await category.update({ isDeleted: true });
  await CategoryLocation.update(
    { isDeleted: true },
    { where: { categoryId: id } }
  );
  return category;
};

exports.getAllCategories = async () => {
  const categories = await Category.findAll({ where: { isDeleted: false } });
  return categories;
};

exports.getCategoryById = async (id) => {
  const category = await Category.findByPk(id);
  if (!category) {
    throw new Error("Category not found");
  }
  return category;
};
