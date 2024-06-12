const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    category: String,
    size: String,
    price: String
}, { timestamps: true });

const product = mongoose.model('sprint17_PB', UserSchema);

module.exports = { product };