const Cart = require("../models/cart.model");
const User = require("../models/user.model");
const CreateCart = async (req, res) => {
  const {products} = req.body
  const [{productId, color, quantity, size}] = products
  try {
    const userId = await User.findOne(req.body._id);
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // if cart is exist for user
      let itemIndex = cart.products.findIndex(product => {
        return product.productId == productId && product.color == color && product.size == size   
      });
      if (itemIndex > -1) {
        let productItem = cart.products[itemIndex];
        productItem.quantity += quantity;
        cart.products[itemIndex] = productItem;
      } else {
        console.log("cart", cart.products);
        cart.products.push({productId, color, quantity, size})
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      // if no cart for user, create new
      const newCart = await Cart.create(req.body);
      console.log("newCart", newCart);
      return res.status(200).send(newCart);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

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
    const id = await User.findById(req.params.id);
    const cart = await Cart.findOne({userId: id})
    const productId = req.body
    cart.products.splice(productId, 1)    
    
    cart.save()
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).json(error);
  }
};

const GetUserCart = async (req, res) => {
  try {
    const id = await User.findById(req.params.id);
    const cart = await Cart.findOne({userId: id}).populate('userId').populate({path: 'products',  populate: {path: 'productId', select: 'title price img'}})
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
