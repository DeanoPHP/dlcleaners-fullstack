const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');

      // If there is not a user
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Not authorized',
        });
      }

      next();
    } catch (error) {
      console.log(error.message);
      res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }
  }

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Not authorized',
    });
  }
};

module.exports = { protect };
