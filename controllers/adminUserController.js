const AdminUserService = require('../services/adminUserService');

exports.register = async (req, res) => {
  try {
    const user = await AdminUserService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await AdminUserService.login(req.body);
    res.json(token);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    // Assuming you are using a token blacklist or similar mechanism
    console.log(req)
    await AdminUserService.logout(req);
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
