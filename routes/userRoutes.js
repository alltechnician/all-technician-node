const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validateRegister, validateLogin } = require('../middlewares/validationMiddleware')
const router = express.Router();

router.post('/register',validateRegister, userController.register);
router.post('/login',validateLogin, userController.login);
router.get('/profile', authMiddleware, (req, res) => {
  res.json(req.user);
});

module.exports = router;
