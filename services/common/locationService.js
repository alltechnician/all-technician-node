const { Location } = require("../../models");
const { NotFoundError, ValidationError } = require("../../utils/customErrors");

const createLocation = async (data) => {
  const { name } = data;

  // Check if location name already exists
  const existingLocation = await Location.findOne({
    where: { name, isDeleted: false },
  });
  if (existingLocation) throw new ValidationError("Location name already exists");

  const newLocation = await Location.create({ name });
  return newLocation;
};

const listLocations = async () => {
  return await Location.findAll({ where: { isDeleted: false } });
};

const getLocationById = async (id) => {
  const location = await Location.findOne({
    where: { id, isDeleted: false },
  });
  if (!location) throw new NotFoundError("Location not found");
  return location;
};

const updateLocation = async (id, data) => {
  const location = await Location.findByPk(id);
  if (!location) throw new NotFoundError("Location not found");

  await location.update(data);
  return location;
};

const deleteLocation = async (id) => {
  const location = await Location.findByPk(id);
  if (!location) throw new NotFoundError("Location not found");

  await location.update({ isDeleted: true });
  return { message: "Location deleted successfully" };
};

module.exports = {
  createLocation,
  listLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
};
