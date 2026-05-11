const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const tradeController = require('../controllers/tradeController');

router.get('/holdings', authMiddleware, tradeController.getHoldings);
router.get('/orders', authMiddleware, tradeController.getOrders);
router.get('/transactions', authMiddleware, tradeController.getTransactions);
router.post('/order', authMiddleware, tradeController.placeOrder);

module.exports = router;
