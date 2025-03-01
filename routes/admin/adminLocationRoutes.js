const express = require("express");
const locationController = require("../../controllers/common/locationController");
const validate = require("../../utils/validationHandler");
const {
  locationSchema,
  updateLocationSchema,
  idParamSchema,
} = require("../../validations/common/locationValidation");
const { asyncHandler } = require("../../utils/requestHandler");
const { authenticate } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authenticate,
  validate(locationSchema),
  asyncHandler(locationController.createLocation)
);

router.get("/", authenticate, asyncHandler(locationController.listLocations));

router.get(
  "/:id",
  authenticate,
  validate(idParamSchema, "params"),
  asyncHandler(locationController.getLocationById)
);

router.put(
  "/:id",
  authenticate,
  validate(idParamSchema, "params"),
  validate(updateLocationSchema, "body"),
  asyncHandler(locationController.updateLocation)
);

router.delete(
  "/:id",
  authenticate,
  validate(idParamSchema, "params"),
  asyncHandler(locationController.deleteLocation)
);

module.exports = router;
