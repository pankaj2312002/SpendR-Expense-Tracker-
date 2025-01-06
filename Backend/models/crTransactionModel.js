const mongoose = require("mongoose");

const crTransactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, // The person who made the transaction
  room: { type: mongoose.Schema.Types.ObjectId, ref: "room" }, // Associated room

  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("crTransactions", crTransactionSchema);
