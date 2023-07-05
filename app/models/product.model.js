const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    title: {type: String, required: true},
    desc: {type: String, required: true},
    img: {type: String, required: true},
    categories: {type: Array},
    size: {type: String},
    color: {type: String},
    price: {type: Number, required: true},
}, {timestamps: true});


const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;