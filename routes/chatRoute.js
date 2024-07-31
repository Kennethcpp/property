const express = require("express")

const chatController = require("../controllers/chatController")
const  {validateReg, validatelogin, validateForgotPassword} = require("../middleware/authMiddleware")
 

const router = express.Router()   
 
  
router.get("/get-all-chats", validatelogin, chatController.getAllChat)
//register
router.get("/get-chat/:id", validatelogin,  chatController.getSingleChat)

//login
router.post("/add-chat", validatelogin, chatController.addChat)

//logout
router.put("/read-chat/:id", validatelogin, chatController.readChat)



module.exports = router