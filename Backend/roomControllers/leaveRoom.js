const Room = require('../models/roomModel');
const User = require('../models/userModel');

const leaveRoom = async (req, res) => {
  const { roomId } = req.params;
  const userId = req.user.id;
  const room = req.room; // Middleware se room already aya hoga

  try {
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
