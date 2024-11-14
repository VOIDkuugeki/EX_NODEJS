const express = require('express');
const router = express.Router();
const squareController = require('../controllers/squareController');

router.post('/calculate', squareController.calculatePerimeter);

module.exports = router;