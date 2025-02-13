const Room = require('../models/roomModel');

const isParticipant = async (req, res, next) => {
  const { roomId } = req.params;
  const userId = req.user.id;

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Check if user is a member
    const member = room.members.find((member) => String(member.userId) === String(userId));
    if (!member) {
      return res.status(404).json({ message: 'User is not a member of this room' });
    }

    // Prevent admin from proceeding
    if (member.role === 'admin') {
      return res.status(400).json({
        message: 'Admins cannot leave the room',
        notification: 'You are the admin of this room and cannot leave. Please assign another admin or delete the room instead.',
      });
    }

    // Attach room data to request for next middleware
    req.room = room;
    req.member = member;
    next();
  } catch (error) {
    console.error('Error in isParticipant middleware:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {isParticipant};
