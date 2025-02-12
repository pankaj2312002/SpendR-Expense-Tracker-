const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    members: [{ 
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        role: { type: String, enum: ['admin', 'member'], default: 'member' }
    }] ,
    crTransactions: [{
        crTransactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'crTransactions' },
    }], 

    inviteLink: { type: String  },     
},
 {
    timestamps: true // This adds createdAt and updatedAt fields automatically
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;





