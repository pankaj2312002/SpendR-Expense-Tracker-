const Room = require('../models/roomModel');

const isAdmin = async (req, res, next) => {
    const { roomId } = req.params;
    const userId = req.user.id; // Authenticated user's ID
  
    try {
      // Check if the room exists
      const room = await Room.findById(roomId);
      if (!room) {
        console.log(`room is not present in isAdmin middleware`);
        return res.status(404).json({ message: "Room not found" });
      }
  
      // Check if the user is an admin
      const adminMember = room.members.find(member => member.role === 'admin');
      if (!adminMember || adminMember.userId.toString() !== userId) {
        return res.status(403).json({ message: "Only the admin can delete this room" });
      }
  
      next();
    } catch (error) {
      console.error("🔴 Error in isAdmin middleware:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };

module.exports = {isAdmin};
