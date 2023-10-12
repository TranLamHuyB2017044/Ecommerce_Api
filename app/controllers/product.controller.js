const Product = require("../models/product.model");
const cloudinary = require("cloudinary").v2;

const CreateProduct = async (req, res) => {
  // try {
  //   const newProduct =  new Product ({
  //     title: req.body.title,
  //     desc: req.body.desc,
  //     img: req.file?.path,
  //     img_id: req.file?.filename,
  //     categories: req.body.categories,
  //     size: req.body.size,
  //     color: req.body.color,
  //     price: req.body.price,
  //     inStock: req.body.inStock,
  //   })
  //   res.send(await newProduct.save())

  // } catch (error) {
  //     if(req.file){
  //       cloudinary.uploader.destroy(req.file.filename);
  //     }
  //     res.status(500).json(error)
  // }
  const { title, desc, categories, size, color, price, inStock } = req.body;
  try {
    let productUpload = new Product({
      title,
      desc,
      categories,
      size,
      color,
      price,
      inStock,
    });
    if (req.files) {
      const imgURIs = [];
      const files = req.files;
      for (const file of files) {
        const { path, filename } = file;
        imgURIs.push({ url_img: path, img_id: filename });
      }
      productUpload["img"] = imgURIs;
      res.send(await productUpload.save());
    }
  } catch (error) {
    if (req.files) {
      for (const file of req.files) {
        const { filename } = file;
        cloudinary.uploader.destroy(filename);
      }
      res.status(500).json(error);
    }
  }
};

const UpdateProduct = async (req, res) => {
  try {
    let updateProduct = await Product.findById(req.params.id);
    // for (const file of req.files) {
    //   const {filename} = file
    //   await cloudinary.uploader.destroy(filename);
    // }
    const data = {
      title: req.body.title || updateProduct.title,
      desc: req.body.desc || updateProduct.desc,
      categories: req.body.categories || updateProduct.categories,
      size: req.body.size || updateProduct.size,
      color: req.body.color || updateProduct.color,
      price: req.body.price || updateProduct.price,
      inStock: req.body.inStock || updateProduct.inStock,
    };

    if (req.files) {
      const imgURIs = [];
      const files = req.files;
      for (const file of files) {
        const { path, filename } = file;
        imgURIs.push({ url_img: path, img_id: filename });
      }
      data["img"] = imgURIs;
    }
    updateProduct = await Product.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

const DeleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    // await Product.deleteMany() delete all products
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
  const qCategory = req.query.category;
  const search = req.query.search;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else if (search) {
      products = await Product.find({
        title: { $regex: search, $options: "i" },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  UpdateProduct,
  DeleteProduct,
  GetProduct,
  GetAllProduct,
  CreateProduct,
};
