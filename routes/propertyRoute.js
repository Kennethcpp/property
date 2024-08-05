 const express = require('express');
 const router = express.Router();
const propertyController = require('../controllers/propertyController');
const upload = require("../middleware/multerConfig")
const { verifyTenants, verifyAdmin, shouldBeLogedIn, verifyOwner} = require("../middleware/verifyRoles")
const path = require('path');










// Create Property
router.post('/create-property', verifyAdmin(['manager', 'owner']), upload.array('images', 10), propertyController.createProperty);

//get all property
router.get("/get-property/:id",   verifyOwner, propertyController.getProperty)


// update Property for Sale
router.put('/update-property/:id', verifyOwner, propertyController.updateProperty);

// Delete Property
router.delete('/delete-property/:id', verifyOwner, propertyController.deleteProperty);



module.exports = router;
  