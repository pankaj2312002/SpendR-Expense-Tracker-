// controllers/transactionController.js
const Room = require('../models/roomModel');
const User = require('../models/userModel');
const CrTransaction = require('../models/crTransactionModel');

const addRoomTransaction = async (req, res) => {
  const { amount, description, createdBy, room, date } = req.body;

  // Only validate for fields that are required in the schema
  if (!amount || !createdBy || !room) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    const newTransaction = new CrTransaction({
      amount,
      description,
      createdBy,
      room,
      date, // Optional, will default to Date.now if not provided
    });

    const savedTransaction = await newTransaction.save();

    // Update the Room document by adding the new transaction to `crTransactions`
    const roomUpdate = await Room.findByIdAndUpdate(
      room,
      { $push: { crTransactions: { crTransactionId: savedTransaction._id } } },
      { new: true }
    );

    if (!roomUpdate) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Update the User document by adding the transaction to `crTransactionsss`
    const userUpdate = await User.findByIdAndUpdate(
      createdBy,
      { $push: { crTransactionsss: { crTrnsactionId: savedTransaction._id } } },
      { new: true }
    );

    if (!userUpdate) {
      return res.status(404).json({ message: "User not found" });
    }


    return res.status(201).json(savedTransaction);
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addRoomTransaction };
