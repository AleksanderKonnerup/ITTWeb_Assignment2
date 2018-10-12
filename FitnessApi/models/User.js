const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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

UserSchema.methods.toJSON = () => {
    const user = this;
    const userObject = user.toObject();

    return _.pick(userObject, ['_id', 'username']);
}

const User =  mongoose.model("User", UserSchema);

module.exports = User;