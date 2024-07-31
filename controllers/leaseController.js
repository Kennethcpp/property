const Lease = require('../models/leaseSchema');
const Property = require('../models/propertySchema');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createLease = async (req, res) => {
    const { propertyId, tenantId, startDate, endDate, yearlyRent } = req.body;
    try {
        const lease = new Lease({
            property: propertyId,
            tenant: tenantId,
            startDate,
            endDate,
            yearlyRent,
            payments: []
        });
        await lease.save();
        res.json(lease);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.payLease = async (req, res) => {
    const { leaseId, amount, paymentMethodId } = req.body;
    try {
        const lease = await Lease.findById(leaseId);
        if (!lease) {
            return res.status(404).json({ msg: 'Lease not found' });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'usd',
            payment_method: paymentMethodId,
            confirm: true
        });

        lease.payments.push({ amount, date: new Date() });
        await lease.save();

        res.json({ msg: 'Payment successful', paymentIntent });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getLease = async (req, res) => {
    try {
        const lease = await Lease.findById(req.params.id).populate('property').populate('tenant');
        if (!lease) {
            return res.status(404).json({ msg: 'Lease not found' });
        }
        res.json(lease);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
