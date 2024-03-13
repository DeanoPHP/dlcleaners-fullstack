const express = require('express');
const { createTimeslot, getTimeslots, deleteTimeslot } = require('../controllers/dateTimeslots');

const router = express.Router();

router.route('/')
      .get(getTimeslots)
      .post(createTimeslot)

router.route('/:id')
      .delete(deleteTimeslot)

module.exports = router;
