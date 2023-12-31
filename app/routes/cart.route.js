const express = require('express');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require('../controllers/verifyToken.controller');
const Cart = require('../controllers/cart.controller');
const router = express.Router();

router.route('/')
    .post(Cart.CreateCart)
    .get(verifyTokenAndAdmin, Cart.GetAll)
router.route('/:id')
    .get(verifyTokenAndAuthorization, Cart.GetUserCart)
    .put(Cart.UpdateCart)
    .delete(verifyTokenAndAuthorization, Cart.DeleteCart)


module.exports = router