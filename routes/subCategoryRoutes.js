const express = require("express");
const {
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategoryById,
} = require("../controllers/subCategoryController");
const {
  validateSubCategory,
  validateSubCategoryId,
} = require("../middlewares/validationMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const router = express.Router();

router.post(
  "/subcategories",
  upload.single("image"),
  validateSubCategory,
  addSubCategory
);
router.put(
  "/subcategories/:id",
  upload.single("image"),
  validateSubCategoryId,
  validateSubCategory,
  updateSubCategory
);
router.delete("/subcategories/:id", validateSubCategoryId, deleteSubCategory);
router.get("/subcategories", getAllSubCategories);
router.get("/subcategories/:id", validateSubCategoryId, getSubCategoryById);

module.exports = router;
