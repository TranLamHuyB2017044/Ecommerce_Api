const Cart = require("../models/cart.model");



const CreateCart = async (req, res) => {
    try {
        const newCart =  new Cart(req.body)
        const CartSave = await newCart.save()
        return res.status(200).json(CartSave)
    } catch (error) {
        res.status(500).json(error)
    }
}

const UpdateCart = async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

const DeleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};


const GetUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({userID: req.params.userID});
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
};

const GetAll = async (req, res) => {
    try {
        const carts = await Cart.find()
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports = { UpdateCart, DeleteCart, GetUserCart, CreateCart, GetAll};
