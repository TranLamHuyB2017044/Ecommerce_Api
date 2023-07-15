const User = require("../models/user.model");
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEYPASS
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if(!user) {
        return res.status(401).json('wrong username');
    }
    const hashPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEYPASS
    );
    const Orignalpassword = hashPassword.toString(CryptoJS.enc.Utf8);
    if(Orignalpassword !== req.body.password) {
        return res.status(401).json('wrong password');
    }
    const accessToken = jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin
      }, 
      process.env.JWT_SECRET,
      {expiresIn: '3d'}
    )
    const {password, ...others} = user._doc 
    return res.status(200).json({others, accessToken});
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { register, login};
