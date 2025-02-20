const express = require("express");
const {
  addLocation,
  updateLocation,
  deleteLocation,
  getAllLocations,
  getLocationById,
} = require("../controllers/locationController");
const {
  validateLocation,
  validateLocationId,
} = require("../middlewares/validationMiddleware");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/locations", authMiddleware, validateLocation, addLocation);
router.put(
  "/locations/:id",
  authMiddleware,
  validateLocationId,
  validateLocation,
  updateLocation
);
router.delete(
  "/locations/:id",
  authMiddleware,
  validateLocationId,
  deleteLocation
);
router.get("/locations", authMiddleware, getAllLocations);
router.get(
  "/locations/:id",
  authMiddleware,
  validateLocationId,
  getLocationById
);

module.exports = router;
