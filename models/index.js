const sequelize = require("../config/database");

const { AdminUser,AdminUserSessionLogs,AdminNotifications } = require("./admin-models/index");

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
  AdminNotifications
  // User,
  // Location,
  // ServiceCategory,
  // ServiceCategoryCategory,
  // Category,
  // CategoryLocation,
  // SubCategory,
  // Role,
  // Permission,
  // RolePermission,
};

module.exports = db;
