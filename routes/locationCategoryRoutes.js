const express = require('express');
const { getCategoriesByLocationId } = require('../controllers/categoryLocationController');
const router = express.Router();

router.get('/location-categories/:locationId', getCategoriesByLocationId);

module.exports = router;
