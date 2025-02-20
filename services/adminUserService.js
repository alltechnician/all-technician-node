const AdminUser = require("../models/adminUser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (userData) => {
  const {
    fullName,
    email,
    password,
    phoneNumber,
    profileImage,
    fcmToken,
    isMasterAdmin,
  } = userData;
  const existingUser = await AdminUser.findOne({ where: { email } });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await AdminUser.create({
    fullName,
    email,
    password,
    phoneNumber,
    profileImage,
    fcmToken,
    isMasterAdmin,
  });
  return { message: "User registered successfully", user };
};

exports.login = async ({ email, password }) => {
  const user = await AdminUser.findOne({ where: { email } });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Incorrect password");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return { message: "Logged in successfully", token };
};
