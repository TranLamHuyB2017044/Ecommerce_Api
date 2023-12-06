const express = require('express');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require('../controllers/verifyToken.controller');
const Order = require('../controllers/order.controller');
const router = express.Router();

router.route('/')
    .post(verifyToken, Order.CreateOrder)
    .get(verifyTokenAndAdmin, Order.GetAll)
router.route('/icome')
    .get(verifyTokenAndAdmin, Order.getMonthlyIncome)
router.route('/:id')
    .get(verifyTokenAndAuthorization, Order.GetOrder)
    .put(verifyTokenAndAdmin, Order.UpdateOrder)
    .delete(verifyTokenAndAdmin, Order.DeleteOrder)
router.route('/userOrder/:id')
    .get(verifyTokenAndAuthorization, Order.GetUserOrder)

module.exports = router