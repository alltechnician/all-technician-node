const express = require("express");
const permissionController = require("../../controllers/admin/permissionController");
const validate = require("../../utils/validationHandler");
const {
  permissionSchema,
  updatePermissionSchema,
  idParamSchema,
} = require("../../validations/admin/permissionValidation");
const { asyncHandler } = require("../../utils/requestHandler");
const { authenticate } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authenticate,
  validate(permissionSchema),
  asyncHandler(permissionController.createPermission)
);
router.put(
  "/:id",
  authenticate,
  validate(idParamSchema, "params"), // Validate the `id` in params
  validate(updatePermissionSchema, "body"), // Validate the request body,
  asyncHandler(permissionController.updatePermission)
);
router.get("/", authenticate, asyncHandler(permissionController.listPermissions));
router.get(
    "/:id",
    authenticate,
    validate(idParamSchema, "params"), // Validate the `id` in params
    asyncHandler(permissionController.getPermissionById)
  );
router.delete(
    "/:id",
    authenticate,
    validate(idParamSchema, "params"), // Validate the `id` in params
    asyncHandler(permissionController.deletePermission)
  );

module.exports = router;
