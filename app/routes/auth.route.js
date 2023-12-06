const express = require('express');
const router = express.Router();
const User = require('../controllers/auth.controller');
const fileUploader = require('../config/cloudinary.config');

router.route('/register')
    .post(fileUploader.avataUpload.single('avatar'), User.register)
router.route('/login')
    .post(User.login)
router.route('/refreshToken')
    .post(User.getAccessToken)

module.exports = router