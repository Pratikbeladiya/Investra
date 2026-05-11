const express = require('express');
const router = express.Router();
const watchlistController = require('../controllers/watchlistController');

router.get('/', watchlistController.getStocks);
router.get('/indices', watchlistController.getIndices);

module.exports = router;
