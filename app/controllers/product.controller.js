const Product = require("../models/product.model");



const CreateProduct = async (req, res) => {
    try {
        const newProduct = await new Product(req.body)
        newProduct.save()
        res.status(200).json(newProduct)
    } catch (error) {
        res.status(500).json(error)
    }
}

const UpdateProduct = async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

const DeleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

const GetProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

const GetAllProduct = async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category
  try {
    let products;
    if(qNew){
        products = await Product.find().sort({createdAt: -1}).limit(1)
    }else if(qCategory){
        products = await Product.find({categories: {
            $in:[qCategory]
        }})
    }else{
        products = await Product.find();
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};


module.exports = { UpdateProduct, DeleteProduct, GetProduct, GetAllProduct, CreateProduct };
