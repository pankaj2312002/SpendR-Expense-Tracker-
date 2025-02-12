const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser"); // Import cookie-parser
const dotenv = require("dotenv");
// const colors = require("colors");
const connectDb = require("./config/connectDb");

// config dot env file
dotenv.config();

//call fun for connecting to database
connectDb();

// create server-side app
const app = express();

//middlewares
app.use(morgan("dev"));  // 'dev' is a predefined log format that logs concise output colored by response status
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware
app.use(cors({
  origin: ['https://spend-r-expense-tracker.vercel.app', 'http://localhost:3000'],  // Allow requests from this frontend origin
  credentials: true,                 // Allow credentials (cookies, authorization headers, etc.)
}));
// cors is used so that backend port allow frontend to use backend's req/apis

//route import and mount
app.use("/api/v1", require("./routes/route"));
//port
const PORT = process.env.PORT ?? 8080;

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});