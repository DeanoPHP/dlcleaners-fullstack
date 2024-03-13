const User = require('../models/UserModel');
const jwt = require('jsonwebtoken')

const getUsers = async (req, res) => {
  try {
    const user = await User.find();

    res.status(200).json({
      success: true,
      count: user.length,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, tel, password } = req.body;

    if (!name || !email || !tel || !password) {
      res.status(400).json({
        success: false,
        message: 'Please include all fields',
      });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(401).json({
        success: false,
        message: 'That user already exists',
      });
    }

    const user = await User.create({
      name,
      email,
      tel,
      password,
    });

    res.status(200).json({
      success: true,
      token: generateToken(user._id),
      data: user,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({
      success: false,
      message: 'You must enter your email and password'
    })
  }

  const user = await User.findOne({ email })

  if (user.password !== password) {
    return res.status(401).json({
      success: false,
      message: 'Your password is incorrect'
    })
  }

  if (user) {
    res.status(200).json({
      success: true,
      token: generateToken(user.user_id),
      data: user
    }) 
  } else {
    res.status(401).json({
      success: false,
      message: 'Something has gone wrong. Please try again using the correct credentials'
    })
  }
};  

const getMe = async (req, res) => {
 const user = {
  id: req.user._id,
  name: req.user.name,
  email: req.user.email, 
  tel: req.user.tel
 }

 res.status(200).json(user)
}

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

module.exports = {
  getUsers,
  createUser,
  loginUser,
  getMe
};
