const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" , require: true },
    items:{type:Array, required: true},
    address: {type: String, required: true},
    phone: {type: String, required: true},
    payment: {type: String, required: true},  
    shipping: {type: String, required: true},
    status: { type: String, default: "Pending"},
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
