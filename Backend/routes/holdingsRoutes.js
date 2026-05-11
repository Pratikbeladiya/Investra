const express = require('express');
const router = express.Router();
const holdingsController = require('../controllers/holdingsController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/holdings', authMiddleware, holdingsController.getHoldings);

module.exports = router;
