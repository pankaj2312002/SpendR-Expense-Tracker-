const crTransactionModel = require("../models/crTransactionModel");
const roomModel = require("../models/roomModel");
const userModel = require("../models/userModel");

// const deleteRoomTransaction = async (req, res) => {
//   try {
//     const { roomId } = req.params; // Get roomId from request params
//     const {  memberId , transactionId } = req.body; // Get transactionId and memberId from request body
//     const userId = req.user.id; // Assume `req.user` contains authenticated user details (e.g., from JWT)
  
//     // Step 1: Check if the room exists
//     const room = await roomModel.findById(roomId);
//     if (!room) {
//       return res.status(404).json({ message: "Room not found" });
//     }

//     // Step 2: Verify the user is a member of the room
//     const isMember = room.members.some(
//       (member) => member.userId.toString() === userId
//     );
//     if (!isMember) {
//       return res.status(403).json({ message: "You are not a member of this room" });
//     }

//     // Step 3: Check if the transaction exists
//     const transaction = await crTransactionModel.findById(transactionId);
//     if (!transaction) {
//       return res.status(404).json({ message: "Transaction not found" });
//     }

//     // Step 4: Verify the transaction belongs to the room
//     if (transaction.room.toString() !== roomId) {
//       return res.status(403).json({ message: "Transaction does not belong to this room" });
//     }

//     // Step 5: Verify the user has permission to delete the transaction
//     // Users can delete their own transactions, or admins of the room can delete any transaction
//     const userRole = room.members.find(
//       (member) => member.userId.toString() === userId
//     )?.role;

//     if (
//       transaction.createdBy.toString() !== userId &&
//       userRole !== "admin"
//     ) {
//       return res.status(403).json({
//         message: "You are not authorized to delete this transaction",
//       });
//     }

//     // Step 6: Delete the transaction from the crTransaction collection
//     await crTransactionModel.findByIdAndDelete(transactionId);

//     // Step 7: Remove the transaction ID from the room's `crTransactions` list
//     room.crTransactions = room.crTransactions.filter(
//       (transaction) => transaction.crTransactionId.toString() !== transactionId
//     );
//     await room.save();

//     // OPTIONAL: Remove the transaction ID from the user's `crTransactionsss` list
//     if (memberId) {
//       const member = await userModel.findById(memberId);
//       if (member) {
//         member.crTransactionsss = member.crTransactionsss.filter(
//           (t) => t.crTrnsactionId.toString() !== transactionId
//         );
//         await member.save();
//       }
//     }

//     return res.status(200).json({
//       message: "Transaction deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error deleting transaction:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// module.exports = { deleteRoomTransaction };



const deleteRoomTransaction = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { memberId, transactionId } = req.body;
    const userId = req.user.id;

    console.log(`roomId: ${roomId}, userId: ${userId}, transactionId: ${transactionId}, memberId: ${memberId}`);

    const room = await roomModel.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    const isMember = room.members.some((member) => member.userId.toString() === userId);
    if (!isMember) return res.status(403).json({ message: "Access denied: Not a room member" });

    const transaction = await crTransactionModel.findById(transactionId);
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    if (transaction.room.toString() !== roomId)
      return res.status(403).json({ message: "Transaction not in this room" });

    const userRole = room.members.find((member) => member.userId.toString() === userId)?.role;
    if (transaction.createdBy.toString() !== userId && userRole !== "admin")
      return res.status(403).json({ message: "Unauthorized to delete this transaction" });

    await crTransactionModel.findByIdAndDelete(transactionId);

    room.crTransactions = room.crTransactions.filter(
      (t) => t.crTransactionId.toString() !== transactionId
    );
    await room.save();

    if (memberId) {
      const member = await userModel.findById(memberId);
      if (member) {
        member.crTransactionsss = member.crTransactionsss.filter(
          (t) => t.crTrnsactionId.toString() !== transactionId
        );
        await member.save();
      }
    }

    return res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { deleteRoomTransaction };

