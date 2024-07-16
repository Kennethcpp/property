
const express = require("express")

const {shouldBeLogedIn, shouldBeAdmin} = require("../controllers/testController")
const {verifyToken} = require("../middleware/verifyTokens")



const router = express.Router()





router.get("/should-be-login", verifyToken, shouldBeLogedIn )

router.get("/should-be-admin",verifyToken, shouldBeAdmin)




module.exports = router