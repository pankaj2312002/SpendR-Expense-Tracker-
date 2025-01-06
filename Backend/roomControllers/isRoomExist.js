const Room = require("../models/roomModel");
const user = require("../models/userModel");

const isRoomExist = async (req, res) => {
  const { roomId } = req.params;

  try {
    // Find room by roomId
    const room = await Room.findById(roomId);
    
    if (!room) {
      // Room does not exist
      console.log(`room is not found in isExists file`)
      return res.status(404).json({ isAvailable: false });
    }

    // Room exists
    console.log(`okay , room is found of this id in Exits wali file`)
    return res.status(200).json({ isAvailable: true });
  } catch (error) {
    console.error("Error checking room availability:", error);
    return res.status(500).json({ isAvailable: false, message: "Server error" });
  }
};

module.exports = { isRoomExist };
