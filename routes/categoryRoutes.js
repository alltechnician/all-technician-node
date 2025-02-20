const express = require("express");
const {
  addCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
} = require("../controllers/categoryController");
const {
  validateCategory,
  validateCategoryId,
} = require("../middlewares/validationMiddleware");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

router.post(
  "/categories",
  authMiddleware,
  upload.single("image"),
  validateCategory,
  addCategory
);
router.put(
  "/categories/:id",
  authMiddleware,
  upload.single("image"),
  validateCategoryId,
  validateCategory,
  updateCategory
);
router.delete(
  "/categories/:id",
  authMiddleware,
  validateCategoryId,
  deleteCategory
);
router.get("/categories", authMiddleware, getAllCategories);
router.get(
  "/categories/:id",
  authMiddleware,
  validateCategoryId,
  getCategoryById
);

module.exports = router;
