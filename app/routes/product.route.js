/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get all shoes
 *     responses:
 *       200:
 *         description: A JSON array of shoes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *   post:
 *     summary: Create a new shoe
 *     responses:
 *       201:
 *         description: Shoes object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 * 
 * /api/product/{productId}:
 *   get:
 *     summary: Find shoes by Id
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses: 
 *       200:
 *         description: Shoes object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Shoes not found
 *   put:
 *     summary: Update shoes by Id
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses: 
 *       200:
 *         description: Shoes object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Shoes not found 
 *   delete:
 *     summary: Delete shoes by Id
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses: 
 *       200:
 *         description: Shoes object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Shoes not found             
 * 
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         size:
 *           type: string
 *         price:
 *           type: number
 */


const express = require('express');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../controllers/verifyToken.controller');
const Product = require('../controllers/product.controller');
const { imgUpload } = require('../config/cloudinary.config');
const router = express.Router();


router.route('/')
    .post(verifyTokenAndAdmin, imgUpload.array('img'), Product.CreateProduct)
    .get(Product.GetAllProduct)
router.route('/:id')
    .get(Product.GetProduct)
    .put(verifyTokenAndAdmin, imgUpload.array('img'), Product.UpdateProduct)
    .delete(verifyTokenAndAdmin, Product.DeleteProduct)


module.exports = router