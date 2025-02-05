const transactionModel = require("../models/transactionModel");
const moment = require('moment');

const getAllTransaction = async (req, res) => {
  console.log(`req is in controller(getAllWala)`);
  try {
    const { frequency, selectedDate, type, userid } = req.body;

    // Build the query conditions dynamically
    const query = {
      userid: userid, // Ensure the user ID is included in the query
      ...(type !== "all" && { type }), // Apply the type filter if not 'all'
      ...(frequency !== "custom"
        ? { date: { $gt: moment().subtract(Number(frequency), "d").toDate() } }
        : { date: { $gte: selectedDate[0], $lte: selectedDate[1] } }), // Apply date filter based on frequency
    };

    // Fetch transactions from the database, including the reference field
    const transactions = await transactionModel.find(query).select("date amount type category reference");

    // Return the fetched transactions
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json(error); // If there's an error, send a 500 status with the error
  }
};


const addTransaction = async (req, res) => {
  // console.log(`req is in controller(AddWala)`);
  try {
    // const newTransaction = new transactionModel(req.body);
    console.log(req,res)
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(200).send("Transaction Created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Controller for deleting a transaction
const deleteTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;  // Extract the transactionId from the URL

    // Find the transaction by ID and delete it
    const deletedTransaction = await transactionModel.findByIdAndDelete(transactionId);

    // If the transaction doesn't exist
    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Respond with a success message
    res.status(200).json({ message: "Transaction deleted successfully", deletedTransaction });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



module.exports = { getAllTransaction, addTransaction ,  deleteTransaction };