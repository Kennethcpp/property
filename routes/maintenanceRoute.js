const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');
const authMiddleware = require('../middleware/authMiddleware');





// Create Maintenance Request     (['tenant']),
router.post('/create',  maintenanceController.createMaintenanceRequest);

// Get Maintenance Request
router.get('/:id',  maintenanceController.getMaintenanceRequest);

// Update Maintenance Request      (['property_manager', 'property_owner']), 
router.put('/:id/update', maintenanceController.updateMaintenanceRequest);

module.exports = router;
