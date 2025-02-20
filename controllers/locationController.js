const LocationService = require('../services/locationService');

exports.addLocation = async (req, res) => {
  try {
    const location = await LocationService.addLocation(req.body);
    res.status(201).json(location);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const location = await LocationService.updateLocation(req.params.id, req.body);
    res.json(location);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteLocation = async (req, res) => {
  try {
    const location = await LocationService.deleteLocation(req.params.id);
    res.json({ message: 'Location deleted successfully', location });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllLocations = async (req, res) => {
  try {
    const locations = await LocationService.getAllLocations();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLocationById = async (req, res) => {
  try {
    const location = await LocationService.getLocationById(req.params.id);
    res.json(location);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
