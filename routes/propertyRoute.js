 const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { verifyTenants, verifyAdmin, shouldBeLogedIn} = require("../middleware/verifyRoles")
const multer = require('multer');
const path = require('node:path');

// Setup multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Create Property
router.post('/create', verifyAdmin(['manager', 'owner']),  propertyController.createProperty);

// Delete Property
router.delete('/:id', verifyAdmin(['manager', 'owner']), propertyController.deleteProperty);

// Search Properties
router.get('/search', propertyController.searchProperties);

// List Property for Sale
router.put('/:id/list-for-sale', verifyAdmin(['manager', 'owner']), propertyController.listPropertyForSale);

// Buy Property
router.post('/buy', shouldBeLogedIn, propertyController.buyProperty);


module.exports = router;
  