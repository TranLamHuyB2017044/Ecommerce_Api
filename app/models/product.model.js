const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    title: {type: String, required: true},
    desc: {type: String, required: true},
    img: [{
        url_img: {type: String, required: true},
        img_id: {type: String, required: true},
    }],
    categories: [{type: String}],
    size:[{type: String}],
    color: [{type: String}],
    price: {type: Number, required: true},
    inStock: {type: Number, require: true},
}, {timestamps: true});


const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;