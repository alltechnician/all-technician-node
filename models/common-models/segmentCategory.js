const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const Category = require("./category");
const SegmentCategory = require("./segmentCategory");

const segmentCategory = sequelize.define(
  "segment_categories",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    segmentId: {
      type: DataTypes.UUID,
      references: {
        model: SegmentCategory,
        key: "id",
      },
    },
    categoryId: {
      type: DataTypes.UUID,
      references: {
        model: Category,
        key: "id",
      },
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
  }
);

// Define associations
SegmentCategory.belongsToMany(Category, {
  through: SegmentCategory,
  foreignKey: "segmentId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Category.belongsToMany(SegmentCategory, {
  through: SegmentCategory,
  foreignKey: "categoryId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = segmentCategory;
