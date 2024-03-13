const DateTimeslot = require('../models/DateTimeslotes');

const createTimeslot = async (req, res) => {
  const { date, time } = req.body;

  if (!date || !time) {
    return res.status(200).json({
      success: false,
      message: 'You must enter a date and time to add a booking slot',
    });
  }

  // Check date and time is not already in DB
  const checkAvailable = await DateTimeslot.findOne({ date, time });

  if (checkAvailable) {
    return res.status(401).json({
      success: false,
      message: 'That date and time slot is already in database',
    });
  }

  const create = await DateTimeslot.create({ date: date, time: time });

  if (!create) {
    return res.status(401).json({
      success: false,
      message: 'Something has gone wrong. Please try again',
    });
  }

  res.status(200).json(create);
};

const getTimeslots = async (req, res) => {
  try {
    const timeslots = await DateTimeslot.find();

    if (!timeslots) {
      return res.status(400).json({
        success: false,
        message: 'There are not time slots to choose from',
      });
    }

    res.status(200).json({
      success: true,
      count: timeslots.length,
      data: timeslots,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteTimeslot = async (req, res) => {
  const id = req.params.id

  if (!id) {
    return res.status(401).json({
      success: false,
      message: `We can not find an id with ${id}`
    })
  }

  const deleteTimeslot = await DateTimeslot.findByIdAndDelete(id)

  if (!deleteTimeslot) {
    return res.status(401).json({
      success: false,
      message: `We can not find an id with ${id}`
    })
  }

  res.status(200).json({
    success: true,
    message: `Deleted timeslot with the id of ${id}`
  })
}

module.exports = {
  createTimeslot,
  getTimeslots,
  deleteTimeslot
};
