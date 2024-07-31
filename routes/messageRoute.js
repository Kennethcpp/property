const express = require("express")

const {getAllmessage, getSingleMessage, addMessage, readMessage } = require("../controllers/messageController")
const  {validateReg, validatelogin, validateForgotPassword} = require("../middleware/authMiddleware")
 

const router = express.Router()   
 
  
//router.get("/get-all-message", getAllmessage)
//register
//router.get("/single-message/:id",  getSingleMessage)

//login
router.post("/add-message/:chatId", addMessage)

//logout
//router.post("/read-message/:id", readMessage)



module.exports = router