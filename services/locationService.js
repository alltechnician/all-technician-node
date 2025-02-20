const Location = require("../models/location");

exports.addLocation = async (data) => {
  const location = await Location.create(data);
  return location;
};

exports.updateLocation = async (id, data) => {
  const location = await Location.findByPk(id);
  if (!location) {
    throw new Error("Location not found");
  }
  await location.update(data);
  return location;
};

exports.deleteLocation = async (id) => {
  const location = await Location.findByPk(id);
  if (!location) {
    throw new Error("Location not found");
  }
  await location.update({ isDeleted: true });
  return location;
};

exports.getAllLocations = async () => {
  const locations = await Location.findAll({ where: { isDeleted: false } });
  return locations;
};

exports.getLocationById = async (id) => {
  const location = await Location.findByPk(id);
  if (!location) {
    throw new Error("Location not found");
  }
  return location;
};
