const User = require("../models/userModel");
const Room = require("../models/roomModel");

// Function to fetch the user's rooms and member details
const dataForSlider = async (req, res) => {

  const  userId  = req.user._id;
  console.log(`This is userId in dataForSlider : ${userId}`)

  try {
    // Find the user by ID and populate all the rooms the user is part of
    const user = await User.findById(userId).populate({
      path: "rooms.roomId",
      model: "Room", // Reference the Room model
      populate: {
        path: "members.userId", // Populate userId in the room's members array
        model: "user", // Reference the user model for member names
        select: "name", // Only select the name field for each member
      },
    });

    // If the user is not found or has no rooms, return an empty array
    if (!user || !user.rooms) {
      return res.json([]); // Send empty array and terminate execution
    }

    // Format the data to return roomId, room name, and member names
    // ***********IMPORTANT****************
    const roomsData = user.rooms
      .filter(room => room.roomId) // Ensure we only include rooms with valid roomId data
      .map(room => {
        const roomDetails = room.roomId;
        return {
          roomId: roomDetails._id, // Add roomId to the returned object
          name: roomDetails.name,
          members: roomDetails.members
            .filter(member => member.userId) // Exclude null userId
            .map(member => member.userId.name), // Get member names
        };
      });

    return res.status(200).json(roomsData); // Send the formatted data

  } catch (error) {
    console.error("Error fetching user rooms:", error.message);
    return res.status(500).json({ error: "Internal Server Error" }); // Send error response
  }
};

module.exports = { dataForSlider };
