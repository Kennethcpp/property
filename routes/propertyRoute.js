 const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

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




const roles = ['property_manager', 'property_owner'];
const uploadPhotos = upload.array('photos', 10);

//roles, uploadPhotos,
router.post('/create',  propertyController.createProperty);


// Create Property
//router.post('/create', [(['property_manager', 'property_owner']), upload.array('photos', 10)], propertyController.createProperty);

// Delete Property        (['property_manager', 'property_owner']),
router.delete('/:id',  propertyController.deleteProperty);

// Search Properties authMiddleware(),
router.get('/search',  propertyController.searchProperties);

// List Property for Sale       (['property_owner']),
router.put('/:id/list-for-sale',  propertyController.listPropertyForSale);

// Buy Property authMiddleware   (['tenant', 'property_owner', 'property_manager']),
router.post('/buy',  propertyController.buyProperty);

module.exports = router;
 