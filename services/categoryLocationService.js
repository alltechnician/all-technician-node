const CategoryLocation = require('../models/categoryLocation');
const ServiceCategory = require('../models/serviceCategory');

exports.getCategoriesByLocationId = async (locationId) => {
  const locationCategories = await CategoryLocation.findAll({
    where: { locationId, isDeleted: false },
    include: [
      {
        model: ServiceCategory,
        attributes: ['id', 'name', 'isActive', 'isDeleted', 'createdAt', 'updatedAt'],
        where: { isDeleted: false }
      }
    ]
  });

  return locationCategories.map(lc => lc.ServiceCategory);
};
