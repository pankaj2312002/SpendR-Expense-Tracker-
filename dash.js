const getAllTransaction = async (req, res) => {
    console.log(`req is in getAllTransaction controller`);
    try {
      const { frequency, selectedDate, type } = req.body;
  
      // Extract user ID from middleware
      const userId = req.user._id;
  
      // Build the query conditions dynamically
      const query = {
        creator: userId, // Ensure transactions belong to the authenticated user
        ...(type !== "all" && { type }), // Apply type filter if not 'all'
        ...(frequency !== "custom"
          ? { date: { $gt: moment().subtract(Number(frequency), "d").toDate() } }
          : { date: { $gte: new Date(selectedDate[0]), $lte: new Date(selectedDate[1]) } }), // Apply date filter based on frequency
      };
  
      // Fetch transactions from the database
      const transactions = await transactionModel
        .find(query)
        .select("date amount type category reference description"); // Include necessary fields
  
      // Return the fetched transactions
      res.status(200).json(transactions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  };





const Room = require('../models/roomModel');
const User = require('../models/userModel');
const crTransactions = require('../models/crTransactionModel');

const deleteRoom = async (req, res) => {
  const { roomId } = req.params;
  const userId = req.user.id; // Authenticated user's ID

  try {
    // Step 1: Check if the room exists
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Step 2: Check if the requesting user is the Admin of the room
    const adminMember = room.members.find(member => member.role === 'admin');
    if (!adminMember || adminMember.userId.toString() !== userId) {
      return res.status(403).json({ message: "Only the Admin can delete this room" });
    }

    // Step 3: Remove the room reference from all User documents
    await User.updateMany(
      { 'rooms.roomId': roomId },
      { $pull: { rooms: { roomId: roomId } } }
    );

    // Step 4: Optionally, delete all transactions associated with the room
    await crTransactions.deleteMany({ room: roomId });

    // Step 5: Delete the room from the Room collection
    await Room.findByIdAndDelete(roomId);

    // Step 6: Respond with a success message
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ message: "Error deleting room", error: error.message });
  }
};

module.exports = { deleteRoom };
