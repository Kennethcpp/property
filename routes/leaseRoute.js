const express = require('express');
const leaseController = require('../controllers/leaseController');
const {verifyAdmin, verifyToken, verifyTenants, shouldBeLogedIn } = require("../middleware/verifyRoles")
const Users = require("../models/userSchema")



const router = express.Router()


// Create Lease
router.post('/create', verifyTenants(['tenant']), leaseController.createLease);

// Pay Lease
router.post('/pay', verifyTenants(['tenant']), leaseController.payLease);

// Get Lease
router.get('/get-lease/:id', shouldBeLogedIn, leaseController.getLease);

module.exports = router
