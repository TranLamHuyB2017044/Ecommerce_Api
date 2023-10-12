const User = require("../models/user.model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

const register = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    avatar: req.file?.path,
    avatar_id: req.file?.filename,
    isAdmin: req.body.isAdmin,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEYPASS
    ).toString(),
  });
  try {
    const username = await User.findOne({ username: req.body.username });

    const email = await User.findOne({ email: req.body.email });

    if (username) {
      return res.status(401).json("Username already exists");
    }
    if (email) {
      return res.status(401).json("Email already exists");
    }
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    if (req.file) {
      cloudinary.uploader.destroy(req.file.filename);
    }
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json("wrong username");
    }
    const hashPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEYPASS
    );
    const Orignalpassword = hashPassword.toString(CryptoJS.enc.Utf8);
    if (Orignalpassword !== req.body.password) {
      return res.status(401).json("wrong password");
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );
    const { password, ...others } = user._doc;
    return res.status(200).json({ others, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { register, login };
