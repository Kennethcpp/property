
const express = require('express');
const {paystackPayment} = require("../utility/paystackPayment")
const propertyController = require('../controllers/propertyController');
const path = require('node:path');


const router = express.Router();
const cors = require('cors')


router.post("/paystack-gateway", paystackPayment)



module.exports = router