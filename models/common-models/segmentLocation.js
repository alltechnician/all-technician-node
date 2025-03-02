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
      allowNull: false,
      references: {
        model: Location,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    segmentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Segment,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
    tableName: "segment_locations",
    indexes: [
      {
        unique: true,
        fields: ["locationId", "segmentId"],
      },
    ],
  }
);

// Define Many-to-Many Relationship
Location.belongsToMany(Segment, {
  through: SegmentLocation,
  foreignKey: "locationId",
});

Segment.belongsToMany(Location, {
  through: SegmentLocation,
  foreignKey: "segmentId",
});

module.exports = SegmentLocation;
