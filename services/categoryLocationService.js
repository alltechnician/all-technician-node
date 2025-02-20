const CategoryLocation = require('../models/categoryLocation');
const Category = require('../models/category');

exports.getCategoriesByLocationId = async (locationId) => {
  const locationCategories = await CategoryLocation.findAll({
    where: { locationId, isDeleted: false },
    include: [
      {
        model: Category,
        attributes: ['id', 'name', 'isActive', 'isDeleted', 'createdAt', 'updatedAt'],
        where: { isDeleted: false }
      }
    ]
  });

  return locationCategories.map(lc => lc.Category);
};
