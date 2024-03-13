const mongoose = require('mongoose')

const BookingsSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    }, 
    email: {
        type: String, 
        required: [true, 'Please enter your email'],
        unique: false
    }, 
    tel: {
        type: String, 
        required: [true, 'Please enter your phone number'],
    },
    date: {
        type: Date,
        required: [true, 'Please enter the date of your booking']
    },
    time: {
        type: String, // Example: '14:00'
        required: [true, 'Please enter the time of your booking']
    }
})

module.exports = mongoose.model('Bookings', BookingsSchema)