const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter a your email']
    },
    tel: {
        type: Number,
        required: [true, 'Please enter your phone number']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password']
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }
}, {
    timestamp: true,
})

module.exports = mongoose.model('User', UserSchema)