const SubCategoryService = require("../services/subCategoryService");

exports.addSubCategory = async (req, res) => {
  const { name, isActive, isDeleted, categoryId } = req.body;
  const image = req.file ? req.file.path : null;
  try {
    const subCategory = await SubCategoryService.addSubCategory({
      name,
      isActive,
      isDeleted,
      image,
      categoryId,
    });
    res.status(201).json(subCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateSubCategory = async (req, res) => {
  const { name, isActive, isDeleted } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const subCategory = await SubCategoryService.updateSubCategory(
      req.params.id,
      {
        name,
        isActive,
        isDeleted,
        image,
      }
    );
    res.json(subCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategoryService.deleteSubCategory(
      req.params.id
    );
    res.json({ message: "SubCategory deleted successfully", subCategory });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategoryService.getAllSubCategories();
    res.json(subCategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSubCategoryById = async (req, res) => {
  try {
    const subCategory = await SubCategoryService.getSubCategoryById(
      req.params.id
    );
    res.json(subCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
