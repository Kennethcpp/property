const express = require("express")

const {register, login, logout, forgotPassword, resetpassword, verifyEmail, loadDashboard} = require("../controllers/usersController")
const  {validateReg, validatelogin, validateForgotPassword} = require("../middleware/authMiddleware")
 

const router = express.Router()   
 
  
//register
router.post("/register", validateReg, register)

//login
router.post("/login", validatelogin, login)

//logout
router.post("/logout", logout)

//forgot password
router.post("/forgotPassword", validateForgotPassword,forgotPassword)

router.get("/reset-password/:id/:passToken", resetpassword)

router.post("/verify-email", verifyEmail)

router.get("/dashboard", loadDashboard)


module.exports = router