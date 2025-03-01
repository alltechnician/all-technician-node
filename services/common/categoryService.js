const { Category } = require("../../models");
const { NotFoundError, ValidationError } = require("../../utils/customErrors");

const createCategory = async (data) => {
  const { name, image } = data;

  // Check if category name already exists
  const existingCategory = await Category.findOne({ where: { name } });
  if (existingCategory) throw new ValidationError("Category name already exists");

  const newCategory = await Category.create({ name, image });
  return newCategory;
};

const listCategories = async () => {
  return await Category.findAll({ where: { isDeleted: false } });
};

const getCategoryById = async (id) => {
  const category = await Category.findOne({
    where: { id, isDeleted: false },
  });
  if (!category) throw new NotFoundError("Category not found");
  return category;
};

const updateCategory = async (id, data) => {
  const category = await Category.findByPk(id);
  if (!category) throw new NotFoundError("Category not found");

  await category.update(data);
  return category;
};

const deleteCategory = async (id) => {
  const category = await Category.findByPk(id);
  if (!category) throw new NotFoundError("Category not found");

  await category.update({ isDeleted: true });
  return { message: "Category deleted successfully" };
};

module.exports = {
  createCategory,
  listCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
