const { Segment, Location, SegmentLocation } = require("../../models");
const { NotFoundError, ValidationError } = require("../../utils/customErrors");


const createSegment = async (data) => {
  const { name, image, locationIds } = data;

  // Check if all provided locationIds exist
  const existingLocations = await Location.findAll({
    where: {
      id: locationIds,
      isDeleted: false, // Ensure locations are not deleted
    },
  });

  if (existingLocations.length !== locationIds.length) {
    throw new ValidationError("One or more locations do not exist.");
  }

  // Create Segment
  const segment = await Segment.create({ name, image });

  // Associate Segment with Locations
  await segment.addLocations(existingLocations);

  return segment;
};


const listSegments = async () => {
  return await Segment.findAll({ where: { isDeleted: false } });
};

const getSegmentById = async (id) => {
  const segment = await Segment.findOne({
    where: { id, isDeleted: false },
    include: [{ model: Location, through: { attributes: [] } }],
  });
  if (!segment) throw new NotFoundError("Segment not found");
  return segment;
};

const updateSegment = async (id, data) => {
  const { locationIds, ...updateData } = data;

  const segment = await Segment.findByPk(id);
  if (!segment) throw new NotFoundError("Segment not found");

  // Update segment details
  await segment.update(updateData);

  // Update associated locations
  if (locationIds) {
    await SegmentLocation.destroy({ where: { segmentId: id } });
    const locationEntries = locationIds.map((locationId) => ({
      segmentId: id,
      locationId,
    }));
    await SegmentLocation.bulkCreate(locationEntries);
  }

  return segment;
};

const deleteSegment = async (id) => {
  const segment = await Segment.findByPk(id);
  if (!segment) throw new NotFoundError("Segment not found");

  await segment.update({ isDeleted: true });
  return { message: "Segment deleted successfully" };
};

module.exports = {
  createSegment,
  listSegments,
  getSegmentById,
  updateSegment,
  deleteSegment,
};
