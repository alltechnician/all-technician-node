const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const Location = require("./locations");
const Segment = require("./segment");

const SegmentLocation = sequelize.define(
  "segment_locations",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    locationId: {
      type: DataTypes.UUID,
      references: {
        model: Location,
        key: "id",
      },
    },
    segmentId: {
      type: DataTypes.UUID,
      references: {
        model: Segment,
        key: "id",
      },
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
  }
);

Location.belongsToMany(Segment, {
  through: SegmentLocation,
  foreignKey: "locationId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Segment.belongsToMany(Location, {
  through: SegmentLocation,
  foreignKey: "segmentId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = SegmentLocation;
