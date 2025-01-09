const Room = require("../models/roomModel");

const getConfirmPageData = async (req, res) => {
    const { roomId } = req.params;

    console.log("roomId,", req.params);
  
    try {
      // Find the room by its ID and populate the user details in the members array
      const room = await Room.findById(roomId)
        .populate("members.userId", "name");
  
      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }
  
      // Extract the admin member
      const adminMember = room.members.find(member => member.role === 'admin');
  
      if (!adminMember) {
        return res.status(404).json({ message: "Admin not found in this room" });
      }
  
      // Prepare the response data
      const responseData = {
        roomName: room.name,
        adminName: adminMember.userId.name, // Admin's name
      };
  
      // Send the response data
      res.status(200).json(responseData);
  
    } catch (error) {
      console.error("Error fetching confirmation page data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  module.exports = { getConfirmPageData };