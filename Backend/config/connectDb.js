const mongoose = require("mongoose");
// const colors = require("colors");
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL , {
      
      
      connectTimeoutMS: 30000,  // 30 seconds
      socketTimeoutMS: 45000,   // 45 seconds
      serverSelectionTimeoutMS: 20000,
    });
    console.log(`Server Running On ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`${error}`.bgRed);
  }
};

module.exports = connectDb;