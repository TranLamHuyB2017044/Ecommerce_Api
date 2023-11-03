const Cart = require("../models/cart.model");
const User = require("../models/user.model");
const CreateCart = async (req, res) => {
  const { products } = req.body;
  const [{ productId, color, quantity, size }] = products;
  try {
    const userId = await User.findById(req.body.userId);
    let cart = await Cart.findOne({ userId });
    if (cart) {
      // if cart is exist for user
      let itemIndex = cart.products.findIndex((product) => {
        return (
          product.productId == productId &&
          product.color == color &&
          product.size == size
        );
      });
      if (itemIndex > -1) {
        let productItem = cart.products[itemIndex];
        productItem.quantity += quantity;
        cart.products[itemIndex] = productItem;
      } else {
        cart.products.push({ productId, color, quantity, size });
        await User.findByIdAndUpdate(userId, { cart: cart._id }, { new: true });
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      // if no cart for user, create new
      const newCart = await Cart.create(req.body);
      await User.findByIdAndUpdate(
        userId,
        { cart: newCart._id },
        { new: true }
      );
      return res.status(200).send(newCart);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const UpdateCart = async (req, res) => {
  try {
    const id = await User.findById(req.params.id);
    const cart = await Cart.findOne({ userId: id });
    const { _id, color, size, quantity } = req.body;
    
    cart.products.forEach(product => {
        if(product.id === _id) {
          product.color = color || product.color
          product.size = size || product.size
          product.quantity = quantity || product.quantity
        }
    })
    cart.save()
    res.status(200).json(cart);
  
  } catch (error) {
    res.status(500).json(error);
  }
};

const DeleteCart = async (req, res) => {
  try {
    const id = await User.findById(req.params.id);
    const cart = await Cart.findOne({ userId: id });
    const { productIndex } = req.body;
    cart.products.splice(productIndex, 1);
    cart.save();
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).json(error);
  }
};

const GetUserCart = async (req, res) => {
  try {
    const id = await User.findById(req.params.id);
    const cart = await Cart.findOne({ userId: id })
      .populate("userId")
      .populate({
        path: "products",
        populate: { path: "productId", select: "title price img color size" },
      });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
};

const GetAll = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { UpdateCart, DeleteCart, GetUserCart, CreateCart, GetAll };
