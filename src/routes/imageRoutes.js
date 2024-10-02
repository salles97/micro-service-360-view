const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

router.post('/calculate', imageController.getImagesWithAngle);

module.exports = router;
