

const express = require("express")

const {getAllTenant, getOneTenant, updateTenant, deleteTenant }= require("../controllers/adminTenantController")
const {verifyAdmin } = require("../middleware/verifyRoles")



const router = express.Router() 





router.get("/get-all-tenants", verifyAdmin(['manager', 'owner']), getAllTenant)

router.get("/get-one-tenant/:id", verifyAdmin(['manager', 'owner']), getOneTenant)

router.put("/update-tenant/:id", verifyAdmin(['manager', 'owner']), updateTenant )

router.delete("/delete-tenant/:id", verifyAdmin(['manager', 'owner']), deleteTenant)



module.exports = router