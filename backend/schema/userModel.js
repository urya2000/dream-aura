const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : { type: String, required: true },
    email : { type: String, required: true, unique: true },
    phone : { type: String, required: true, unique: true },
    address : { type: String, required: true },
    role : { type: String, enum: ['buyer', 'seller', 'agent' , 'admin'], default: 'buyer' },
    isActive : { type: Boolean, default: true },
    isVerified : { type: Boolean, default: false },
    profilePicture : { type: String, default: '' },
    password : { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    last_login: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
