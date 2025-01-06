const Room = require('../models/roomModel');
const User = require('../models/userModel');

const leaveRoom = async (req, res) => {
  const { roomId } = req.params;
  const userId = req.user.id;

  try {
    // Find the room by roomId
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Check if the user is a member of the room
    const member = room.members.find((member) => String(member.userId) === String(userId));
    if (!member) {
      return res.status(404).json({ message: 'User is not a member of this room' });
    }

    // Prevent admin from leaving the room
    if (member.role === 'admin') {
      return res.status(400).json({
        message: 'Admins cannot leave the room',
        notification: 'You are the admin of this room and cannot leave. Please assign another admin or delete the room instead.',
      });
    }

    // Remove the user from the room's members array
    room.members = room.members.filter((member) => String(member.userId) !== String(userId));
    await room.save();

    // Remove the room from the user's rooms array
    await User.findByIdAndUpdate(userId, {
      $pull: { rooms: { roomId: roomId } },
    });

    return res.status(200).json({ message: 'You have successfully left the room' });
  } catch (error) {
    console.error('Error leaving room:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { leaveRoom };
