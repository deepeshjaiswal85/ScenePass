const express = require('express');
const router = express.Router();
const { getSports, getSportsById } = require('../controllers/sportsController');

router.get('/', getSports);
router.get('/:id', getSportsById);

module.exports = router;
