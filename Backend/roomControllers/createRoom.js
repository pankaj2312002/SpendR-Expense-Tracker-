const Room = require("../models/roomModel");
const User = require("../models/userModel"); // Correct capitalization for consistency

const createRoom = async (req, res) => {
  const { roomName } = req.body;
  const userId = req.user._id; // authenticate middleware assigned this

  try {
    // Validate inputs
    if (!roomName) {
      return res.status(400).json({ message: "Room name is required" });
    }


    // Step 1: Create the new room in the database without the invite link
    const newRoom = await Room.create({
      name: roomName,
      members: [
        {
          userId: userId, // Add the requesting user as a member with "admin" role
          role: "admin",
        },
      ],
    });

    

    // Step 2: Generate the invite link using the roomId
    const inviteLink = `https://spend-r-expense-tracker.vercel.app/confirm-invite/${newRoom._id}/${Math.random()
      .toString(36)
      .substr(2, 8)}`;

    console.log("Generated Invite Link:", inviteLink); // Debug log

    // Step 3: Update the room document with the generated invite link
    newRoom.inviteLink = inviteLink;
    await newRoom.save();

    

    // Step 4: Update the user document to include the new room ID
    // push operator array me new element add/push karne me kaam aata hai 
    await User.findByIdAndUpdate(userId, {
      $push: {
        rooms: {
          roomId: newRoom._id, // Add room ID
          role: "admin", // Set the role as 'admin'
        },
      },
    });

    console.log("User Updated with New Room:", userId); // Debug log

    // Respond with the generated link
    res.status(201).json({
      message: "Room created successfully",
    });
  } catch (error) {
    console.error("Error creating room:", error); // Log the error for debugging
    return res
      .status(500)
      .json({ message: "Error creating room", error: error.message }); // Send error message in response
  }
};

module.exports = { createRoom };