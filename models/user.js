const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }
});

exports.userSchema = userSchema

exports.User = mongoose.model('User', userSchema);
