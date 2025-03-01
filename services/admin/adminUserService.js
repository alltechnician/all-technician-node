const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  AdminUser,
  Role,
  AdminUserRole,
  AdminUserSessionLogs,
} = require("../../models");
const {
  ValidationError,
  UnauthorizedError,
} = require("../../utils/customErrors");
const {
  setCookies,
  clearCookies,
} = require("../../middlewares/cookieMiddleware");
const { Op } = require("sequelize");

/**
 * Registers a new admin user.
 * @param {Object} userData - User registration data
 * @returns {Object} - Registered user data with JWT token
 */
const registerUser = async (userData) => {
  const {
    fullName,
    email,
    password,
    phoneNumber,
    isMasterAdmin,
    profileImage,
    roleId,
  } = userData;

  // Start a transaction
  const transaction = await AdminUser.sequelize.transaction();
  try {
    // Check if email already exists
    const existingUser = await AdminUser.findOne({
      where: { email },
      transaction,
    });
    if (existingUser) {
      throw new ValidationError("Email is already in use");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await AdminUser.create(
      {
        fullName,
        email,
        password: hashedPassword,
        phoneNumber,
        isMasterAdmin: isMasterAdmin || false,
        profileImage,
      },
      { transaction }
    );

    // If user is not a master admin, insert role mapping
    if (!isMasterAdmin) {
      if (!roleId) {
        throw new ValidationError("roleId is required for non-master admins");
      }

      // Check if role exists
      const roleExists = await Role.findOne({
        where: { id: roleId },
        transaction,
      });
      if (!roleExists) {
        throw new NotFoundError("Role not found");
      }

      // Assign role to user
      await AdminUserRole.create(
        {
          adminUserId: newUser.id,
          roleId,
        },
        { transaction }
      );
    }

    // Commit transaction
    await transaction.commit();

    // Generate JWT token
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        isMasterAdmin: newUser.isMasterAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return {
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      isMasterAdmin: newUser.isMasterAdmin,
      token,
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

/**
 * Generates access & refresh tokens.
 */
const generateTokens = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    isMasterAdmin: user.isMasterAdmin,
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

/**
 * Handles user login with cookies.
 */
const loginUser = async ({ email, password }, req, res) => {
  const user = await AdminUser.findOne({ where: { email } });
  if (!user) throw new UnauthorizedError("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new UnauthorizedError("Invalid password");

  const { accessToken, refreshToken } = generateTokens(user);

  // Store refreshToken in DB
  await user.update({ refreshToken });

  // **Log the login event**
  await AdminUserSessionLogs.create({
    type: "LOGIN",
    adminUserId: user.id,
    dateTime: new Date(),
  });

  // Set cookies in response
  if (process.env.NODE_ENV === "production") {
    // Use HTTP-only cookies in production
    setCookies(res, accessToken, refreshToken);
    return { message: "Login successful" };
  } else {
    // Use Bearer tokens in development
    return { accessToken, refreshToken, user };
  }
};

/**
 * Refreshes access token using cookies.
 */
const refreshAccessToken = async (req, res) => {
  let refreshToken;

  if (process.env.NODE_ENV === "production") {
    refreshToken = req.cookies.refreshToken;
  } else {
    // Expect "Authorization: Bearer <refreshToken>"
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("Invalid authorization header");
    }
    refreshToken = authHeader.split(" ")[1];
  }

  if (!refreshToken) throw new UnauthorizedError("Refresh token required");

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await AdminUser.findByPk(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedError("Invalid refresh token");
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

    // Update refresh token in the database
    await user.update({ refreshToken: newRefreshToken });

    if (process.env.NODE_ENV === "production") {
      // Set new tokens as cookies
      setCookies(res, accessToken, newRefreshToken);
      return { message: "Token refreshed successfully" };
    } else {
      // Return new tokens in the response
      return { accessToken, refreshToken: newRefreshToken };
    }
  } catch (error) {
    throw new UnauthorizedError("Invalid or expired refresh token");
  }
};

/**
 * Logs out by clearing cookies.
 */
const logoutUser = async (req, res) => {
  let refreshToken;

  if (process.env.NODE_ENV === "production") {
    refreshToken = req.cookies?.refreshToken;
  } else {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("Invalid session");
    }
    refreshToken = authHeader.split(" ")[1]; // Extract token from header
  }

  if (!refreshToken) throw new UnauthorizedError("Invalid session");

  const user = await AdminUser.findOne({ where: { refreshToken } });

  if (user) {
    await user.update({ refreshToken: null });

    // **Log the logout event**
    await AdminUserSessionLogs.create({
      type: "LOGOUT",
      adminUserId: user.id,
      dateTime: new Date(),
    });
  }

  if (process.env.NODE_ENV === "production") {
    clearCookies(res);
    return { message: "Logged out successfully" };
  } else {
    return { message: "Logged out successfully, clear token on client" };
  }
};

/**
 * Lists all admin users with pagination & search, excluding deleted users.
 */
const listAdminUsers = async ({ page = 1, limit = 10, search = "" }) => {
  const offset = (page - 1) * limit;
  const searchQuery = search.trim();

  const whereClause = {
    isDeleted: false, // Exclude deleted users
  };

  if (searchQuery) {
    whereClause[Op.or] = [
      { fullName: { [Op.like]: `%${searchQuery}%` } }, // Case-insensitive search
      { email: { [Op.like]: `%${searchQuery}%` } },
      { phoneNumber: { [Op.like]: `%${searchQuery}%` } },
    ];
  }

  const { rows: users, count: totalUsers } = await AdminUser.findAndCountAll({
    where: whereClause,
    attributes: [
      "id",
      "fullName",
      "email",
      "phoneNumber",
      "isMasterAdmin",
      "profileImage",
      "createdAt",
    ],
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [["createdAt", "DESC"]],
  });

  return {
    totalUsers,
    totalPages: Math.ceil(totalUsers / limit),
    currentPage: page,
    users,
  };
};

const getAdminUserDetails = async (id) => {
  const user = await AdminUser.findOne({
    where: { id, isDeleted: false },
    attributes: { exclude: ["password", "refreshToken"] },
    include: [
      {
        model: AdminUserSessionLogs,
        as: "sessionLogs",
        attributes: ["id", "type", "dateTime", "isActive"], // Exclude unnecessary fields
      },
    ],
  });

  if (!user) {
    throw new NotFoundError("Admin user not found");
  }

  return user;
};

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  listAdminUsers,
  getAdminUserDetails,
};
