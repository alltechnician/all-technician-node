const LocationCategoryService = require('../services/categoryLocationService');

exports.getCategoriesByLocationId = async (req, res) => {
  try {
    const categories = await LocationCategoryService.getCategoriesByLocationId(req.params.locationId);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
