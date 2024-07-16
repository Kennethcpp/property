 const Property = require("../models/propertySchema");
const multer = require('multer');
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

exports.createProperty = [upload.array('photos', 10), async (req, res) => {
    const { location, size, amenities, leaseWorth, salePrice, manager, forSale } = req.body;
    const photos = req.files.map(file => file.path);
    try {
        const property = new Property({
            owner: req.user.id,
            manager: manager || req.user.id,
            location,
            size,
            amenities,
            photos,
            leaseWorth,
            salePrice,
            forSale
        });
        await property.save();
        res.json(property);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}];

exports.deleteProperty = async (req, res) => {
    try {
        await Property.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Property removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.searchProperties = async (req, res) => {
    try {
        const properties = await Property.find({ isAvailable: true });
        res.json(properties);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.listPropertyForSale = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ msg: 'Property not found' });
        }
        if (property.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        property.forSale = true;
        property.salePrice = req.body.salePrice;
        await property.save();
        res.json(property);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.buyProperty = async (req, res) => {
    const { propertyId, paymentMethodId } = req.body;
    try {
        const property = await Property.findById(propertyId);
        if (!property || !property.forSale) {
            return res.status(404).json({ msg: 'Property not available for sale' });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: property.salePrice * 100,
            currency: 'usd',
           
            payment_method: paymentMethodId,
            confirm: true
        });

        property.isAvailable = false;
        property.forSale = false;
        property.owner = req.user.id;
        await property.save();

        res.json({ msg: 'Property purchased successfully', paymentIntent });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
 