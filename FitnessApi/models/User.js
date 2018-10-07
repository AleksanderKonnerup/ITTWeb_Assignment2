const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = User = new Schema({
    _id: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    }
});