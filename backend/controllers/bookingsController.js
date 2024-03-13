const Bookings = require('../models/BookingsModel');

const getBookings = async (req, res) => {
  try {
    const bookings = await Bookings.find();

    if (!bookings) {
      return res.status(401).json({
        msg: 'There are no bookings in the calendar',
      });
    }

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const getBooking = async (req, res) => {
  try {
    const id = req.params.bookingId;

    const booking = await Bookings.findById(id);

    if (!booking) {
      return res.status(400).json({
        success: false,
        message: 'There is not a booking with that id',
      });
    }

    res.status(200).json({
      data: booking,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const createBooking = async (req, res) => {
  try {
    const { name, email, tel, date, time } = req.body;

    if (!name || !email || !tel || !date || !time) {
      return res.status(401).json({
        success: false,
        message: 'One of the fields are empty',
      });
    }

    const checkTimeslot = await Bookings.findOne({ date, time })

    if (checkTimeslot) {
      return res.status(401).json({
        success: false,
        message: 'That date and time is not available'
      })
    }

    const booking = await Bookings.create({
      name,
      email,
      tel,
      date,
      time,
    });

    res.status(200).json(booking);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getBookings,
  getBooking,
  createBooking,
};
