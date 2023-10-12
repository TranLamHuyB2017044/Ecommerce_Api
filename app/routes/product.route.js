const express = require('express');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../controllers/verifyToken.controller');
const Product = require('../controllers/product.controller');
const {imgUpload} = require('../config/cloudinary.config');
const router = express.Router();

router.route('/')
    .post(verifyTokenAndAdmin, imgUpload.array('img'),  Product.CreateProduct)
    .get(Product.GetAllProduct)
router.route('/:id')
    .get(Product.GetProduct)
    .put(verifyTokenAndAdmin, imgUpload.array('img') , Product.UpdateProduct)
    .delete(verifyTokenAndAdmin, Product.DeleteProduct)


module.exports = router