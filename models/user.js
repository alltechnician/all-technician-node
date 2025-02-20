const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const sequelize = require("../config/database");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true, 
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
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
    provider: {
      type: DataTypes.STRING, 
      allowNull: false,
      defaultValue: "local",
    },
    providerId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true, 
  }
);

User.beforeCreate(async (user) => {
  if (user.provider === "local") {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

User.beforeUpdate(async (user) => {
  if (user.changed("password") && user.provider === "local") {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

module.exports = User;
