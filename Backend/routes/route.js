const express = require("express");
const { loginhandler, signUphandler , logouthandler } = require("../controllers/userCtrller");
const {getAllTransaction , addTransaction , deleteTransaction} = require("../controllers/transactionCtrller");
const {createRoom} = require("../roomControllers/createRoom")
const {getConfirmPageData} = require("../roomControllers/getConfirmPageData");
const {authenticateUser} = require("../middlewares/authenticateUser")
const {dataForSlider} =require("../roomControllers/dataForSlider")
const {joinRoom} = require("../roomControllers/joinRoom")
const {getRoomDetails} = require("../roomControllers/getRoomDetails")
const {addRoomTransaction} = require("../roomControllers/addRoomTransaction")
const {getRoomTransactions} =require("../roomControllers/getRoomTransactions")
const {deleteRoom} = require("../roomControllers/deleteRoom");
const {leaveRoom} = require("../roomControllers/leaveRoom");
const { deleteRoomTransaction } = require("../roomControllers/deleteRoomTransaction");
const {isAdmin} = require("../middlewares/isAdmin")
const {isParticipant} = require("../middlewares/isParticipant")

//router object
const router = express.Router();

//routers
router.post("/login", loginhandler);
router.post("/signup", signUphandler);
router.post("/logout", logouthandler);

// personal functionalities
router.post("/transaction/add-transaction",authenticateUser, addTransaction);
router.post("/transaction/getAllTransactions",authenticateUser, getAllTransaction);
router.delete("/transaction/deleteTransaction/:transactionId",authenticateUser, deleteTransaction);

// common room functionalities
router.post("/create-room", authenticateUser , createRoom);
router.get("/dataForSlider", authenticateUser , dataForSlider);
router.get("/confirmPageData/:roomId" ,authenticateUser , getConfirmPageData );
router.post("/joinRoom",authenticateUser , joinRoom);
router.get ("/get-room-details" ,authenticateUser , getRoomDetails);
router.post("/common-room/add-transaction" , authenticateUser , addRoomTransaction)
router.get('/common-rooms/:roomId/getTransactions', authenticateUser , getRoomTransactions);
router.delete('/common-rooms/:roomId/deleteRoom' , authenticateUser, isAdmin, deleteRoom)
router.delete('/common-rooms/:roomId/leaveRoom' , authenticateUser, isParticipant ,  leaveRoom)
router.delete('/common-rooms/:roomId/deleteTransaction' ,authenticateUser , deleteRoomTransaction)









module.exports = router;