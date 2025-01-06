const jwt = require('jsonwebtoken');
const UserDB = require("../models/userModel"); // Import the correct User model

// Middleware to authenticate user and add user data to `req`
const authenticateUser = async (req, res, next) => {
    console.log(`token is extracting from cookie`);
  // Expect token in "Authorization: Bearer <token>" format
  const token = req.cookies.mycookie; // Get token from cookies
  console.log(`token extracted : ${token}`);
  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(`token is verified`);
    // Find the user by ID extracted from token
    const user = await UserDB.findById(decoded.id);
    if (!user) {
        console.log(`user don't exist in auth middleware`);
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach the found user to `req.user`
    console.log(` i am reached at adding user in req object`)
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ message: 'Invalid token, authorization denied' });
  }
};

module.exports = { authenticateUser };
