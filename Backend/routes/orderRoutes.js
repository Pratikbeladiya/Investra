const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/orders', authMiddleware, orderController.getOrders);
router.post('/order', authMiddleware, orderController.placeOrder);

module.exports = router;
