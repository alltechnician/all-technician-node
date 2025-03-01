
const { asyncHandler, handleServiceCall } = require("../../utils/requestHandler");
const adminUserService = require("../../services/admin/adminUserService");

const register = asyncHandler(async (req, res) => {
  await handleServiceCall(res, adminUserService.registerUser, [req.body]);
});

const login = asyncHandler(async (req, res) => {
  await handleServiceCall(res, adminUserService.loginUser, [req.body, req, res]);
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  await handleServiceCall(res, adminUserService.refreshAccessToken, [req, res]);
});

const logout = asyncHandler(async (req, res) => {
  await handleServiceCall(res, adminUserService.logoutUser, [req, res]);
});


const listAdminUsers = asyncHandler(async (req, res) => {
  const { page, limit, search } = req.query;
  await handleServiceCall(res, adminUserService.listAdminUsers, [{ page, limit, search }]);
});

const getAdminUserDetails = asyncHandler(async (req, res) => {
  await handleServiceCall(res, adminUserService.getAdminUserDetails, [req.params.id]);
});


module.exports = { login, refreshAccessToken, logout, register,listAdminUsers,getAdminUserDetails };
