const express = require('express');
const router = express.Router();
const stocksController = require('../controllers/stocksController');

router.get('/', stocksController.getStocks);
router.get('/indices', stocksController.getIndices);

module.exports = router;
