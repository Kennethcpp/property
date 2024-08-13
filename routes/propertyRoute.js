 const express = require('express');
 const router = express.Router();
const propertyController = require('../controllers/propertyController');
const upload = require("../middleware/multerConfig")
//const { verifyTenants, verifyAdmin, shouldBeLogedIn, verifyOwner} = require("../middleware/verifyRoles")
const path = require('path');










// Create Property //verifyAdmin(['manager', 'owner']),
router.post('/create-property',  upload.array('images', 10), propertyController.createProperty);

//get all property //verifyOwner,
router.get("/get-property/:id",    propertyController.getProperty)


// update Property for Sale //verifyOwner,
router.put('/update-property/:id',  propertyController.updateProperty);

// Delete Property  verifyOwner,
router.delete('/delete-property/:id',  propertyController.deleteProperty);



module.exports = router;
  