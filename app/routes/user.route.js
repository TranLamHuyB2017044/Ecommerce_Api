const express = require('express');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../controllers/verifyToken.controller');
const User = require('../controllers/user.controller');
const fileUploader = require('../config/cloudinary.config');

const router = express.Router();
router.route('/')
.get(verifyTokenAndAdmin, User.GetAllUser)

router.route('/stats')
    .get(verifyTokenAndAdmin, User.GetUserStats)

router.route('/:id')
    .put(verifyTokenAndAuthorization, fileUploader.single('avatar'), User.UpdateUser)
    .delete(verifyTokenAndAuthorization, User.DeleteUser)
    .get(verifyTokenAndAdmin, User.GetUser)

module.exports = router