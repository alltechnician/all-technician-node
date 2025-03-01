const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const sequelize = require("../../config/database");

const AdminUser = sequelize.define(
  "admin_users",
  {
    id: {
      type: DataTypes.UUID,  
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fullName: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    profileImage: { type: DataTypes.STRING, defaultValue: null },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ipAddress: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    fcmToken: {
      type: DataTypes.TEXT, 
      allowNull: true,
    },
    isMasterAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true, 
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
  }
);

// AdminUser.beforeCreate(async (user) => {
//   user.password = await bcrypt.hash(user.password, 10);
// });

// AdminUser.beforeUpdate(async (user) => {
//   user.password = await bcrypt.hash(user.password, 10);
// });


module.exports = AdminUser;
