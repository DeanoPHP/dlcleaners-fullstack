const express = require('express')
const router = express.Router()
const { 
    getBookings, 
    createBooking, 
    getBooking
} = require('../controllers/bookingsController')

const protect = require('../middleware/authMiddleware')

router.route('/')
      .get(getBookings)  
      .post(createBooking)

router.route('/:bookingId')
      .get(getBooking)

module.exports = router