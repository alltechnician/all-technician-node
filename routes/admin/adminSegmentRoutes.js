const express = require("express");
const segmentController = require("../../controllers/common/segmentController");
const validate = require("../../utils/validationHandler");
const {
  segmentSchema,
  updateSegmentSchema,
  idParamSchema,
} = require("../../validations/common/segmentValidation");
const { asyncHandler } = require("../../utils/requestHandler");
const { authenticate } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authenticate,
  validate(segmentSchema),
  asyncHandler(segmentController.createSegment)
);

router.get("/", authenticate, asyncHandler(segmentController.listSegments));

router.get(
  "/:id",
  authenticate,
  validate(idParamSchema, "params"),
  asyncHandler(segmentController.getSegmentById)
);

router.put(
  "/:id",
  authenticate,
  validate(idParamSchema, "params"),
  validate(updateSegmentSchema, "body"),
  asyncHandler(segmentController.updateSegment)
);

router.delete(
  "/:id",
  authenticate,
  validate(idParamSchema, "params"),
  asyncHandler(segmentController.deleteSegment)
);

module.exports = router;
