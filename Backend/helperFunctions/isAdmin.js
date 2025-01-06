const Room = require("../models/roomModel");


const isAdminApi = async (userId, roomId) => {
    try {
        // Fetch the room by its ID and populate members
        const room = await Room.findById(roomId).populate('members.userId', 'name');

        if (!room) {
            throw new Error("Room not found");
        }

        // Check if the user is an admin in the room
        // some method is used to check if there’s a match within the members array
        const isAdmin = room.members.some(member => 
            // member.userId and userId are ObjectId types, and comparing them with === will fail since they are objects, not strings
            member.userId.toString() === userId.toString() && member.role === 'admin'
        );

        return isAdmin;  // Returns true if admin, false otherwise

    } catch (error) {
        console.error("Error checking admin status:", error);
        throw error;
    }
};

module.exports = { isAdminApi };
