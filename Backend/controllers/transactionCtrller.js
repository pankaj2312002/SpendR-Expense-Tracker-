const transactionModel = require("../models/transactionModel");
const userModel = require("../models/userModel");
const moment = require('moment');

const getAllTransaction = async (req, res) => {
  console.log(`req is in getAllTransaction controller`);
  try {
    const { frequency, selectedDate, type } = req.body;
    const userid = req.user._id; // Extract user ID from req.user

    // Build the query conditions dynamically
    const query = {
      creator: userid, // Ensure the user ID is included in the query based on the updated schema
      ...(type !== "all" && { type }), // Apply the type filter if not 'all'
      ...(frequency !== "custom"
        ? { date: { $gt: moment().subtract(Number(frequency), "d").toDate() } }
        : { date: { $gte: selectedDate[0], $lte: selectedDate[1] } }), // Apply date filter based on frequency
    };

    // Fetch transactions from the database, including the reference field
    const transactions = await transactionModel.find(query).select("date amount type category reference description");

    // Return the fetched transactions
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json(error); // If there's an error, send a 500 status with the error
  }
};



const addTransaction = async (req, res) => {
  try {
    const { amount, type, category, reference, description, date } = req.body;

    // Validate required fields
    if (!amount || !type || !category || !reference || !description || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Extract user from req.user (assuming middleware sets req.user)
    const creator = req.user._id;
    console.log(`This is userId in addTransaction function: ${creator}`);

    // Create a new transaction
    const newTransaction = new transactionModel({
      creator,
      amount,
      type,
      category,
      reference,
      description,
      date,
    });

    await newTransaction.save();

    // Update user's personalTransactions array
    await userModel.findByIdAndUpdate(
      creator,
      { $push: { personalTransactions: { personalTransactionId: newTransaction._id } } },
      { new: true }
    );

    res.status(201).json({ message: "Transaction Created"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// Controller for deleting a transaction
const deleteTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const userId = req.user._id; // Extract user ID from middleware

    // Find and delete the transaction (ensure it belongs to the user)
    const deletedTransaction = await transactionModel.findOneAndDelete({
      _id: transactionId,
      creator: userId, // Ensure user can only delete their own transactions
    });

    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found or not authorized" });
    }

    // Remove transaction reference from user's personalTransactions array
    await userModel.findByIdAndUpdate(
      userId,
      { $pull: { personalTransactions: { personalTransactionId: transactionId } } },
      { new: true }
    );

    res.status(200).json({ message: "Transaction deleted successfully", deletedTransaction });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




module.exports = { getAllTransaction, addTransaction ,  deleteTransaction };