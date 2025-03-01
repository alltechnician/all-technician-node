const { asyncHandler, handleServiceCall } = require("../../utils/requestHandler");
const categoryService = require("../../services/common/categoryService");

const createCategory = asyncHandler(async (req, res) => {
  await handleServiceCall(res, categoryService.createCategory, [req.body]);
});

const listCategories = asyncHandler(async (req, res) => {
  await handleServiceCall(res, categoryService.listCategories, []);
});

const getCategoryById = asyncHandler(async (req, res) => {
  await handleServiceCall(res, categoryService.getCategoryById, [req.params.id]);
});

const updateCategory = asyncHandler(async (req, res) => {
  await handleServiceCall(res, categoryService.updateCategory, [req.params.id, req.body]);
});

const deleteCategory = asyncHandler(async (req, res) => {
  await handleServiceCall(res, categoryService.deleteCategory, [req.params.id]);
});

module.exports = { createCategory, listCategories, getCategoryById, updateCategory, deleteCategory };
