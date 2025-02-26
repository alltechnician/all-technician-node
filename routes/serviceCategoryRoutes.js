const express = require("express");
const {
  addCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
} = require("../controllers/serviceCategoryController");
const {
  validateCategory,
  validateCategoryId,
} = require("../middlewares/validationMiddleware");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

router.post(
  "/service-categories",
  authMiddleware,
  upload.single("image"),
  validateCategory,
  addCategory
);
router.put(
  "/service-categories/:id",
  authMiddleware,
  upload.single("image"),
  validateCategoryId,
  validateCategory,
  updateCategory
);
router.delete(
  "/service-categories/:id",
  authMiddleware,
  validateCategoryId,
  deleteCategory
);
router.get("/service-categories", authMiddleware, getAllCategories);
router.get(
  "/service-categories/:id",
  authMiddleware,
  validateCategoryId,
  getCategoryById
);

module.exports = router;
