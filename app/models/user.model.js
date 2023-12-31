const mongoose = require("mongoose");
const { schema } = require("./cart.model");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    cart: {type: Schema.Types.ObjectId, ref: "Cart" , default: null},
    order: [{type: Schema.Types.ObjectId, ref: "Order" , default: null}],
    avatar: { type: String, default: 'https://mcdn.coolmate.me/image/June2023/tom-and-jerry-meme-cuc-hai-huoc-de-thuong-1447_451_(1).jpeg'},
    avatar_id: { type: String},
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
