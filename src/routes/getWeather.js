const express = require('express');
const router = express.Router();

const { getData } = require('../controllers/getWeatherCtrl');
router.post('/', getData);

module.exports = router;
