const { asyncHandler, handleServiceCall } = require("../../utils/requestHandler");
const locationService = require("../../services/common/locationService");

const createLocation = asyncHandler(async (req, res) => {
  await handleServiceCall(res, locationService.createLocation, [req.body]);
});

const listLocations = asyncHandler(async (req, res) => {
  await handleServiceCall(res, locationService.listLocations, []);
});

const getLocationById = asyncHandler(async (req, res) => {
  await handleServiceCall(res, locationService.getLocationById, [req.params.id]);
});

const updateLocation = asyncHandler(async (req, res) => {
  await handleServiceCall(res, locationService.updateLocation, [req.params.id, req.body]);
});

const deleteLocation = asyncHandler(async (req, res) => {
  await handleServiceCall(res, locationService.deleteLocation, [req.params.id]);
});

module.exports = { createLocation, listLocations, getLocationById, updateLocation, deleteLocation };
