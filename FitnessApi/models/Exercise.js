const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = Exercise = new Schema({
    _id: {
        type: String,
        required: true,
        trim: true
    },
    exerciseName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    sets: {
        type: Number,
        required: true,
        trim: true
    },
    reps: {
        type: String,
        required: true,
        trim: true
    }
});