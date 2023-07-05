const express = require('express');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../controllers/verifyToken.controller');
const Product = require('../controllers/product.controller');
const router = express.Router();

router.route('/')
    .post(verifyTokenAndAdmin, Product.CreateProduct)
    .get(Product.GetAllProduct)
router.route('/:id')
    .get(Product.GetProduct)
    .put(verifyTokenAndAdmin, Product.UpdateProduct)
    .delete(verifyTokenAndAdmin, Product.DeleteProduct)


module.exports = router