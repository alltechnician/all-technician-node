const express = require('express');
const adminUserController = require('../../controllers/admin/adminUserController');
const router = express.Router();
const validate = require("../../utils/validationHandler");
const { registerSchema,loginSchema,getUUIDSchema } = require("../../validations/admin/authValidation");
const { asyncHandler } = require("../../utils/requestHandler");
const { authenticate } = require("../../middlewares/authMiddleware");
const { decryptMiddleware } = require('../../middlewares/encryptionMiddleware');


router.post("/register", validate(registerSchema), asyncHandler(adminUserController.register));

router.post("/login", validate(loginSchema), asyncHandler(adminUserController.login));
router.post("/refresh-token", asyncHandler(adminUserController.refreshAccessToken));
router.post("/logout",authenticate, asyncHandler(adminUserController.logout));

// List admin users with pagination & search
router.get("/list", authenticate, asyncHandler(adminUserController.listAdminUsers));

router.get(
    "/:id",
    authenticate,
    (req, res, next) => validate(getUUIDSchema, "params")(req, res, next), // Ensure validation runs on `req.params`
    asyncHandler(adminUserController.getAdminUserDetails)
  );

module.exports = router;
