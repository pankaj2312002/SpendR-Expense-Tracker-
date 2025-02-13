const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    amount: {
      type: Number,
      required: [true, "amount is required"],
    },
    type: {
      type: String,
      required: [true, "type is required"],
    },
    category: {
      type: String,
      requires: [true, "cat is required"],
    },
    reference: {
      type: String,
      required: [true, "desc is required"],
    },
    description: {
      type: String,
      required: [true, "desc is required"],
    },
    date: {
      type: Date,
      required: [true, "data is required"],
    },
  },
  { timestamps: true }
);

const transactionModel = mongoose.model("transactions", transactionSchema);
module.exports = transactionModel;



