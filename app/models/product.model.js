const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: {type: String, required: true},
    desc: {type: String, required: true},
    img: {type: String, required: true},
    categories: {type: Array},
    size: {type: Array},
    color: {type: Array},
    price: {type: Number, required: true},
    inStock: {type: Boolean, default: true}
}, {timestamps: true});


const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;