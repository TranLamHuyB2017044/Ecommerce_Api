const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" , require: true },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" , require: true },
        color: {type: String, required:true},
        size: {type: String, required:true},
        quantity: {type: Number, required:true},
        active: {type: Boolean, default: false}
      }
    ]
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
