const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../utils/customErrors");

const authenticate = (req, res, next) => {
  let token;

  if (process.env.NODE_ENV === "production") {
    // In production, get the token from cookies
    token = req.cookies.accessToken;
  } else {
    // In development, get the token from Authorization header (Bearer token)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }

  if (!token) throw new UnauthorizedError("Access token required");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    throw new UnauthorizedError("Invalid or expired access token");
  }
};

module.exports = { authenticate };
