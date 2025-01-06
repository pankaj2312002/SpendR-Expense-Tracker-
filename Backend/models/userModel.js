const mongoose = require("mongoose");

//schema design
// Schema design
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required and should be unique"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    rooms: [
      {
        roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'room' },
        role: { type: String, enum: ['admin', 'member'], default: 'member' }
      }
    ],
    crTransactionsss : [
      {
        crTrnsactionId : {type: mongoose.Schema.Types.ObjectId, ref: 'crTransactions' }
      }
    ]
  },
  { timestamps: true } 
);

//export
const userModel = mongoose.model("user", userSchema);
// "user" specifies the MongoDB collection where the data is stored.
module.exports = userModel;