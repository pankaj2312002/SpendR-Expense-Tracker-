const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require("dotenv").config();

// Utility function to generate JWT token
const generateToken = (userId) => {
  // token = jwt.sign(payload , secret , options)
   token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  //  payload ke ander poora User hi dala huya hai
  return token;
}

// Sign up user
exports.signUphandler = async (req, res) => {
  console.log(`Signup handler initiated with body:`, req.body);
  const { name, email, password } = req.body;

  try {
    console.log("Checking if user exists...");
    let user = await userModel.findOne({ email });
    if (user) {
      console.log("User already exists, sending response...");
      return res.status(400).json({ msg: 'User already exists' });
    }

    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);
     newuser = new userModel({ 
      name, 
      email, 
      password: hashedPassword 
    });
    
    console.log("Saving new user to the database...");
    await newuser.save();


    //  The password field is extracted from the newuser object and assigned to the variable removedPassword
    // The remaining fields (all fields except password) are collected into a new object called User
    // No, there will not be a field named removedPassword in the User object
    const { password: removedPassword, ...User } = newuser.toObject();


    const token = generateToken(newuser._id);
    console.log("token =>", token)


    // const cookieOptions = { httpOnly: true, maxAge: 36000000000000 };
    const cookieOptions = { maxAge: 36000000000000 }
    

    console.log("Setting cookie and sending response...");
    res.cookie('mycookie', token, cookieOptions).status(200).json({
      success: true, 
      message: 'User signup successful',
      User: { ...User, token }
    });

  } catch (err) {
    console.error("Error during SignUp:", err);
    res.status(500).json({ success: false, message: 'User signup failed' });
  }
};

// Log in user
exports.loginhandler = async (req, res) => {
  console.log(`Login handler initiated with body:`, req.body);
  const { email, password } = req.body;

  try {
    console.log("Checking for user...");
    const user = await userModel.findOne({ email });
    if (!user) {
      console.log("Invalid credentials, user not found.");
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    console.log("Comparing password...");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid password, sending response...");
      return res.status(400).json({ msg: 'Invalid password' });
    }
    
    console.log(`password is removing`);
    const { password: removedPassword, ...User } = user.toObject()
    console.log(`token is genrating...`)
    const token = generateToken(user._id);
    console.log(`the generated token is : ${token}`);
    const cookieOptions = { httpOnly: false, maxAge: 3600000 , sameSite: 'None',secure: true};
    

    console.log("Setting cookie and sending response...");
    res.cookie('mycookie', token, cookieOptions).status(200).json({
      success: true,
      message: 'User login successful',
      User: { ...User, token }
    });
    

  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ success: false, message: 'User login failed' });
  }
};

// Log out user
exports.logouthandler = (req, res) => {
  console.log("Logging out user...");
  res.clearCookie('mycookie');
  console.log(`cookie cleared`);
  
  res.status(200).json({ message: 'Logout successful' });
};
