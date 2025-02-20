const CategoryService = require("../services/categoryService");

exports.addCategory = async (req, res) => {
  const { name, isActive, isDeleted, locationId } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const category = await CategoryService.addCategory({
      name,
      isActive,
      isDeleted,
      image,
      locationId,
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  const { name, isActive, isDeleted } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const category = await CategoryService.updateCategory(req.params.id, {
      name,
      isActive,
      isDeleted,
      image,
    });
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await CategoryService.deleteCategory(req.params.id);
    res.json({ message: "Category deleted successfully", category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await CategoryService.getCategoryById(req.params.id);
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
