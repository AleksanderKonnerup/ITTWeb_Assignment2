const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = ActivityLog = new Schema({
    timestamp: {
        type: Date,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
});