const mongoose = require('mongoose')

const TimeslotsScheme = mongoose.Schema({
    date: {
        type: Date,
        required: [true, 'Please enter the date of your booking']
    },
    time: {
        type: String, // Example: '14:00'
        required: [true, 'Please enter the time of your booking']
    }
})

module.exports = mongoose.model('timeslots', TimeslotsScheme)