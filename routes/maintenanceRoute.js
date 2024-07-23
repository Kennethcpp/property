const express = require('express');

const maintenanceController = require('../controllers/maintenanceController');
const { verifyTenants, verifyAdmin } = require("../middleware/verifyRoles")
 



const router = express.Router();
// Create Maintenance Request     
router.post('/create', verifyTenants(['tenant']),  maintenanceController.createMaintenanceRequest);

// Get Maintenance Request
router.get('/get-request/:id',  maintenanceController.getMaintenanceRequest);

// Update Maintenance Request       
router.put('/:id/update', verifyAdmin(['manager', 'owner']), maintenanceController.updateMaintenanceRequest); 

module.exports = router;
