const express = require("express")

const {register, login, logout, forgotPassword, resetpassword, verifyEmail, getAllTenant, getOneTenant, updateTenant, deleteTenant} = require("../controllers/usersController")
//const  {validateReg, validatelogin, validateForgotPassword, validateResetPassword} = require("../middleware/authMiddleware")
//const {verifyAdmin} = require("../middleware/verifyRoles")

 

const router = express.Router()   
 
  
//register //validateReg
router.post("/register", register)

//verifyAdmin(['manager', 'owner']),
router.get("/get-all-tenants",  getAllTenant)

//verifyAdmin(['manager', 'owner']),
router.get("/get-one-tenant/:id",  getOneTenant)
// verifyAdmin(['manager', 'owner']),
router.put("/update-tenant/:id", updateTenant )
//verifyAdmin(['manager', 'owner']),
router.delete("/delete-tenant/:id",  deleteTenant)

//login  //validatelogin,
router.post("/login",  login)

//logout
router.post("/logout", logout)

//forgot password //validateForgotPassword,
router.post("/forgotPassword", forgotPassword)
//validateResetPassword,
router.get("/reset-password/:resetToken",  resetpassword)

router.post("/", verifyEmail)

//router.get("/dashboard", loadDashboard)


module.exports = router