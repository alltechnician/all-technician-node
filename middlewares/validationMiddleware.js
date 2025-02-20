const { body, validationResult, param } = require("express-validator");

const validateRegister = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Email is invalid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("phoneNumber")
    .optional()
    .isMobilePhone()
    .withMessage("Phone number is invalid"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateLogin = [
  body("email").isEmail().withMessage("Email is invalid"),
  body("password").notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateLocation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),
  body("isDeleted")
    .optional()
    .isBoolean()
    .withMessage("isDeleted must be a boolean"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
const validateLocationId = [
  param("id").isInt().withMessage("Invalid location ID"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
const validateCategory = [
  body("name").notEmpty().withMessage("Name is required"),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),
  body("isDeleted")
    .optional()
    .isBoolean()
    .withMessage("isDeleted must be a boolean"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
const validateCategoryId = [
  param("id").isInt().withMessage("Invalid category ID"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateSubCategory = [
  body("name").notEmpty().withMessage("Name is required"),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),
  body("isDeleted")
    .optional()
    .isBoolean()
    .withMessage("isDeleted must be a boolean"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
const validateSubCategoryId = [
  param("id").isInt().withMessage("Invalid subcategory ID"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
module.exports = {
  validateRegister,
  validateLogin,
  validateLocation,
  validateLocationId,
  validateCategory,
  validateCategoryId,
  validateSubCategory,
  validateSubCategoryId,
};
