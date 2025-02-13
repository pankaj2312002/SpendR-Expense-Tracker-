const Room = require('../models/roomModel');
const User = require('../models/userModel');
const crTransactions = require('../models/crTransactionModel');

const deleteRoom = async (req, res) => {
  const { roomId } = req.params;

  try {
    // Step 1: Remove the room reference from all User documents
    await User.updateMany(
      { 'rooms.roomId': roomId },
      { $pull: { rooms: { roomId: roomId } } }
    );

    // Step 2: Optionally, delete all transactions associated with the room
    await crTransactions.deleteMany({ room: roomId });

    // Step 3: Delete the room from the Room collection
    await Room.findByIdAndDelete(roomId);

    // Step 4: Respond with a success message
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ message: "Error deleting room", error: error.message });
  }
};

module.exports = { deleteRoom };
