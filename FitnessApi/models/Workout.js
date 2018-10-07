const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = WorkoutProgram = new Schema({
    _id: {
        type: String,
        required: true,
        trim: true
    },
    workoutName: {
        type: String,
        required: true,
        trim: true
    },
    activities: [{
        type: Schema.Types.ObjectId,
        ref: 'ActivityLog'
    }],
    exercises: [{
        type: Schema.Types.ObjectId,
        ref: 'Exercise'
    }]
});