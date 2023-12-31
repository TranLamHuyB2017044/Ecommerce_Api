const User = require("../models/user.model");
const cloudinary = require('cloudinary').v2;
const CryptoJS = require("crypto-js");

const UpdateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEYPASS
    ).toString();
  }
  try {
    let updateUser = await User.findById(req.params.id)
    if(updateUser.avatar_id){
      await cloudinary.uploader.destroy(updateUser.avatar_id);
    }
    const data = {
      username: req.body.username || updateUser.username,
      email: req.body.email || updateUser.email,
      address: req.body.address || updateUser.address,
      phone: req.body.phone || updateUser.phone,
      avatar: req.file?.path || updateUser.avatar,
      avatar_id: req.file?.filename || updateUser.avatar_id,
      password: req.body.password || updateUser.password,
    } 
    updateUser = await User.findByIdAndUpdate(req.params.id, data, {new: true});
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const DeleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    cloudinary.uploader.destroy(user.avatar_id)
    await User.findByIdAndRemove(req.params.id)
    res.status(200).json("User has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

const GetUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
};

const GetAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

const GetUserStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      { $project: { month: { $month: "$createdAt" } } },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { UpdateUser, DeleteUser, GetUser, GetAllUser, GetUserStats };
