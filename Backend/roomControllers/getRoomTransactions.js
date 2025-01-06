const Room = require('../models/roomModel');
const User = require('../models/userModel');
const crTransactions = require('../models/crTransactionModel');

// Controller to fetch member-wise transactions
const getRoomTransactions = async (req, res) => {
  const { roomId } = req.params;

  try {
    // Fetch the room data with populated fields
    const roomData = await Room.findById(roomId)
      .populate({
        path: 'members.userId',
        select: 'name email', // Only fetch required fields from user
      })
      .populate({
        path: 'crTransactions.crTransactionId',
        select: 'amount description date createdBy', // Fetch necessary fields from crTransactions
        populate: {
          path: 'createdBy',
          select: 'name', // Populate the name of the transaction creator
        },
      });

    if (!roomData) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Group transactions by the creator, including those who left the room
    const transactionsByMember = roomData.crTransactions.reduce((acc, tx) => {
      const creatorId = String(tx.crTransactionId?.createdBy?._id); // Transaction creator ID
      const creatorName = tx.crTransactionId?.createdBy?.name || 'Unknown User'; // Creator name fallback

      // Initialize if not already present
      if (!acc[creatorId]) {
        acc[creatorId] = {
          memberId: creatorId,
          name: creatorName,
          transactions: [],
        };
      }

      // Add the transaction
      acc[creatorId].transactions.push({
        transactionId: tx.crTransactionId._id, // Include transaction ID
        amount: tx.crTransactionId.amount,
        description: tx.crTransactionId.description,
        date: tx.crTransactionId.date,
      });

      return acc;
    }, {});

    // Convert grouped transactions into an array
    const membersWithTransactions = Object.values(transactionsByMember);

    // Send the response
    return res.status(200).json({ members: membersWithTransactions });
  } catch (error) {
    console.error('Error fetching room transactions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getRoomTransactions };
