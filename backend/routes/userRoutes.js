const express = require('express')
const router = express.Router()

// Create Routes here
const { 
    getUsers, 
    createUser,
    loginUser,
    getMe
} = require('../controllers/userController')

router.route('/')
      .get(getUsers)
      .post(createUser)

router.route('/login')
      .post(loginUser)

router.route('/me')
      .get(getMe)


module.exports = router