const sequelize = require('../config/database');

const User = require('./user');
const Location = require('./location');
const Category = require('./category');
const CategoryLocation = require('./categoryLocation');
const SubCategory = require('./subCategory');
const AdminUser = require('./adminUser');
const Role = require('./role');
const Permission = require('./permission');
const RolePermission = require('./rolePermission')

const db = {
  sequelize,
  User,
  Location,
  Category,
  CategoryLocation,
  SubCategory,
  AdminUser,
  Role,
  Permission,
  RolePermission
};

module.exports = db;
