

const express = require("express")

const {getAllTenant, getOneTenant, updateTenant, deleteTenant }= require("../controllers/adminTenantController")
const {verifyToken,verifyAdmin } = require("../middleware/verifyTokens")



const router = express.Router() 





router.get("/getAllUsers", verifyAdmin, getAllTenant)

router.get("/getOneUser/:id", verifyToken, getOneTenant)

router.put("/updateUser/:id", verifyToken, updateTenant )

router.delete("/deleteUser/:id", verifyToken, deleteTenant)



module.exports = router