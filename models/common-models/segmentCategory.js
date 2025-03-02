const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const Category = require("./category");
const Segment = require("./segment");

const SegmentCategory = sequelize.define(
  "segment_categories",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
    tableName: "segment_categories",
    indexes: [
      {
        unique: true,
        fields: ["segmentId", "categoryId"],
      },
    ],
  }
);

// Define Many-to-Many Relationship
Segment.belongsToMany(Category, {
  through: SegmentCategory,
  foreignKey: "segmentId",
  otherKey: "categoryId",
});

Category.belongsToMany(Segment, {
  through: SegmentCategory,
  foreignKey: "categoryId",
  otherKey: "segmentId",
});

module.exports = SegmentCategory;
