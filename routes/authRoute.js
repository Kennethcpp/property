const express = require("express")

const {register, login, logout, forgotPassword} = require("../controllers/authController")



const router = express.Router()   
 
  
//register
router.post("/register", register)

//login
router.post("/login", login)

//logout
router.post("/logout", logout)

//forgot password
router.post("/forgetPassword", forgotPassword)





module.exports = router