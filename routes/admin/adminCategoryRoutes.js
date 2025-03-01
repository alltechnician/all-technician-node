const express = require("express");
const categoryController = require("../../controllers/common/categoryController");
const validate = require("../../utils/validationHandler");
const {
  categorySchema,
  updateCategorySchema,
  idParamSchema,
} = require("../../validations/common/categoryValidation");
const { asyncHandler } = require("../../utils/requestHandler");
const { authenticate } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authenticate,
  validate(categorySchema),
  asyncHandler(categoryController.createCategory)
);

router.get("/", authenticate, asyncHandler(categoryController.listCategories));

router.get(
  "/:id",
  authenticate,
  validate(idParamSchema, "params"),
  asyncHandler(categoryController.getCategoryById)
);

router.put(
  "/:id",
  authenticate,
  validate(idParamSchema, "params"),
  validate(updateCategorySchema, "body"),
  asyncHandler(categoryController.updateCategory)
);

router.delete(
  "/:id",
  authenticate,
  validate(idParamSchema, "params"),
  asyncHandler(categoryController.deleteCategory)
);

module.exports = router;
