const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.isAuth = async (req, res, next) => {
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).json({ success: false, message: 'Unauthorized access!' });
  }

  const token = req.headers.authorization.split(' ')[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.userId);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized access!' });
    }

    req.user = user; // Attach the user object to the request
    next(); // Proceed to the next middleware/controller
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid token!' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Session expired. Please sign in again!' });
    }

    // Log unexpected errors and send a generic message
    console.error('Authorization error:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error!' });
  }
};
