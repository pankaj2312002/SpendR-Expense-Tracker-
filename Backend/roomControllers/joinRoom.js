const Room = require("../models/roomModel");
const User = require("../models/userModel");

const joinRoom = async (req, res) => {
  const { roomId } = req.body;
  const userId = req.user.id; // Assuming `req.user` contains authenticated user info

  console.log(`This is roomId: ${roomId}`);
  console.log(`This is userId: ${userId}`);

  try {
    // Check if the room exists
    const room = await Room.findById(roomId);
    if (!room) {
      console.log(`Room not found in join room request.`);
      return res.status(404).json({ message: "Room not found." });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      console.log(`User not found in join room request.`);
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the user is already a member of the room
    const isMember = room.members.some((member) => {
      return member.userId.toString() === userId.toString();
    });

    if (isMember) {
      console.log(`User is already a member of the room in join room request.`);
      return res.status(400).json({ message: "User is already a member of the room." });
    }

    // Add the user to the room's members with the role of "member"
    room.members.push({ userId, role: "member" });
    await room.save();

    // Add the roomId and role to the user's rooms array
    user.rooms.push({ roomId, role: "member" });
    await user.save();

    res.status(200).json({ message: "User successfully added to the room." });
  } catch (error) {
    console.error("Error adding user to room:", error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = { joinRoom };
