const Room = require("../models/roomModel");
const User = require("../models/userModel");

// Controller to fetch room details, including the admin's ID
const getRoomDetails = async (req, res) => {
    const { roomId } = req.query;
  
    try {
      // Find room by roomId and populate the members' user data
      const room = await Room.findById(roomId).populate('members.userId', 'name'); // Assuming members have a userId field linked to User model
  
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }
  
      // Find the admin from the members list
      const adminMember = room.members.find(member => member.role === 'admin');
      const createdBy = adminMember ? adminMember.userId.name : 'Admin'; // Fallback to "Admin" if no admin found
      const adminId = adminMember ? adminMember.userId._id : null;  // Extract admin's userId from the populated member
  
      if (!adminId) {
        return res.status(400).json({ message: 'No admin found for this room' });
      }

      // Format the createdOn date or provide a fallback
      const createdOn = room.createdAt ? room.createdAt.toISOString().split('T')[0] : 'Date not available';
  
      // Prepare the room info including adminId
       const roomInfo = {
        roomName: room.name, // Room name
        createdOn: createdOn,
        createdBy: createdBy, // Name of the admin
        members: room.members.map(member => ({
          name: member.userId.name, // Name of the member
        })), // Array of member objects with names
        adminId: adminId, // Admin ID
        inviteLink: room.inviteLink,
      };
  
      res.status(200).json(roomInfo);
    } catch (error) {
      console.error('Error fetching room details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
  getRoomDetails,
};
