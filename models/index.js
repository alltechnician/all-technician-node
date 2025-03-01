const sequelize = require("../config/database");

const {
  AdminUser,
  AdminUserSessionLogs,
  AdminNotifications,
  Role,
  Permission,
  AdminUserRole,
  RolePermission,
} = require("./admin-models/index");

const { Location,Segment,SegmentLocation,Category } = require("./common-models");
// const User = require("./user");
// const Location = require("./location");
// const Category = require("./category");
// const CategoryLocation = require("./categoryLocation");
// const SubCategory = require("./subCategory");
// const Role = require("./role");
// const Permission = require("./permission");
// const RolePermission = require("./rolePermission");
// const ServiceCategory = require("./serviceCategory");
// const ServiceCategoryCategory = require("./serviceCategoryCategory");

const db = {
  sequelize,
  AdminUser,
  AdminUserSessionLogs,
  AdminNotifications,

  Role,
  Permission,
  RolePermission,
  AdminUserRole,


  Location,
  Segment,
  SegmentLocation,
  Category
  // User,
  // Location,
  // ServiceCategory,
  // ServiceCategoryCategory,
  // Category,
  // CategoryLocation,
  // SubCategory,
};

module.exports = db;
