 const express = require('express');
const router = express.Router();
const leaseController = require("../controllers/leaseController");
const authMiddleware = require("../middleware/authMiddleware");






// Create Lease      (['property_owner', 'property_manager']),
router.post('/create',  leaseController.createLease);

// Pay Lease       (['tenant']),
router.post('/pay',  leaseController.payLease);

// Get Lease         (['tenant', 'property_owner', 'property_manager']),
router.get('/:id',  leaseController.getLease);

module.exports = router;
  