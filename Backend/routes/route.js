const express = require("express");
const { loginhandler, signUphandler , logouthandler } = require("../controllers/userCtrller");
const {getAllTransaction , addTransaction} = require("../controllers/transactionCtrller");
const {createRoom} = require("../roomControllers/createRoom")
const {getConfirmPageData} = require("../roomControllers/getConfirmPageData");
const {authenticateUser} = require("../middlewares/authenticateUser")
const {isAdminApi} = require("../helperFunctions/isAdmin")
const {dataForSlider} =require("../roomControllers/dataForSlider")
const {isRoomExist} = require("../roomControllers/isRoomExist")
const {joinRoom} = require("../roomControllers/joinRoom")
const {getRoomDetails} = require("../roomControllers/getRoomDetails")
const {addRoomTransaction} = require("../roomControllers/addRoomTransaction")
const {getRoomTransactions} =require("../roomControllers/getRoomTransactions")
const {deleteRoom} = require("../roomControllers/deleteRoom");
const {leaveRoom} = require("../roomControllers/leaveRoom");
const { deleteRoomTransaction } = require("../roomControllers/deleteRoomTransaction");
//router object
const router = express.Router();

//routers
// POST || LOGIN USER
router.post("/login", loginhandler);

//POST || sign-up USER
router.post("/signup", signUphandler);
// logout
router.post("/logout", logouthandler);
// personal functionalities
router.post("/transaction/add-transaction", addTransaction);
router.post("/transaction/getAllTransactions", getAllTransaction);

// common room functionalities
router.post("/create-room", authenticateUser , createRoom);
router.get("/confirmPageData/:roomId" , getConfirmPageData );
router.get("/checkRoomAvailability/:roomId", isRoomExist);
router.post("/joinRoom",authenticateUser , joinRoom);
router.get ("/get-room-details" , getRoomDetails);
router.post("/common-room/add-transaction" , addRoomTransaction)
router.get('/common-rooms/:roomId/getTransactions', getRoomTransactions);
router.delete('/common-rooms/:roomId/deleteRoom' , authenticateUser , deleteRoom)
router.delete('/common-rooms/:roomId/leaveRoom' , authenticateUser , leaveRoom)
router.post('/common-rooms/:roomId/deleteTransaction' ,authenticateUser , deleteRoomTransaction)
// helper functions / utilities
router.get("/check-admin-status" , isAdminApi );

router.get("/dataForSlider",dataForSlider);




module.exports = router;