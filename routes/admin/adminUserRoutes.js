const express = require('express');
const adminUserController = require('../../controllers/adminUserController');
const authMiddleware = require('../../middlewares/authMiddleware');
const { validateRegister, validateLogin } = require('../../middlewares/validationMiddleware')
const router = express.Router();

router.post('/register', adminUserController.register);
router.post('/login',validateLogin, adminUserController.login);
router.get('/profile', authMiddleware, (req, res) => {
  res.json(req.user);
});

module.exports = router;
