const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
}, { timestamps: true });

const user = mongoose.model('sprint17_PB_User', UserSchema);

module.exports = { user };


