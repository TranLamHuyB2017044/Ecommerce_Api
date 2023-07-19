const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
}, {timestamps: true});


const User = mongoose.model('User', UserSchema);
module.exports = User;