const express = require('express');
const router = express.Router();
const { getPlays, getPlayById } = require('../controllers/playController');

router.get('/', getPlays);
router.get('/:id', getPlayById);

module.exports = router;
