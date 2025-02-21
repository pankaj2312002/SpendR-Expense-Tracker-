const jwt = require('jsonwebtoken');
const UserDB = require("../models/userModel"); 


const authenticateUser = async (req, res, next) => {


  const token = req.cookies.mycookie ||                   
                req.header("Authorization")?.replace("Bearer ", "");

  console.log(`token extracted : ${token}`);
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(`token is verified`);
    // Find the user by ID extracted from token
    // why decoded.id ..?? -->> beacuse we create jwt token like this -->> token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const user = await UserDB.findById(decoded.id);
    if (!user) {
        console.log(`user don't exist in auth middleware`);
      return res.status(404).json({ message: 'User not found' });
    }
  
    //  **********IMPORTANT**************
    // Attach the found user to `req.user`
    // now listen , ya toh jab credentails honest nahi honge toh yahi se response chala jayega 
    // Aur agar credentails honest hai toh yaha se response nahi jayega , aur ye request aage jayegi matlab next() per , aur waha se response jayega 
    req.user = user;
    next(); // Proceed to the next middleware or route handler

  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ message: 'Invalid token, authorization denied' });
  }
};

module.exports = { authenticateUser };
