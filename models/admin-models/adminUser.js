const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const AdminUser = sequelize.define(
  "admin_users",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isNumeric: true,
      },
    },
    profileImage: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true,
    },
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
      validate: {
        isIP: true,
      },
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
    indexes: [
      {
        unique: true,
        fields: ['email'],
      },
    ],
    paranoid: true, // does not delete database entries, but adds a deletedAt column
    deletedAt: 'deletedAt', // Use the default deletedAt column
    hooks: {
      beforeDestroy: (instance) => {
        instance.setDataValue('isDeleted', true);
      },
      beforeRestore: (instance) => {
        instance.setDataValue('isDeleted', false);
      },
    },
  }
);

module.exports = AdminUser;
