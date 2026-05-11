const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const fundsController = require('../controllers/fundsController');

router.post('/api/user/add-funds', authMiddleware, fundsController.addFunds);
router.post('/api/user/withdraw', authMiddleware, fundsController.withdrawFunds);
router.get('/api/user/transactions', authMiddleware, fundsController.getUserTransactions);
router.get('/api/trade/transactions', authMiddleware, fundsController.getTradeTransactions);

module.exports = router;
