const Lease = require('../models/leaseSchema');
const Users = require("../models/userSchema")
const Property = require('../models/propertySchema');
const jsonwebtoken = require('jsonwebtoken')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);




exports.createLease = async (req, res) => {
    const {email, startDate, endDate, yearlyRent } = req.body;
    const {id} = req.params
    try {
        const propertys =  await Property.findById(id)
         if(!Property){
            return res.status(401).json({message: 'this property is not available!'})
         }
        
         const User = await Users.findOne({email})
         if(!User)  {
            return res.status(403).json({message: "user not rigistered! please register first"})
         }else{
            if(email !== User.email){
                return res.status(400).json({message: "your email must match your registered email!"})
            }
         }
            
        const lease = new Lease({
            email,
            startDate,
            endDate,
            yearlyRent,
        });
        
        const leaseToken = jsonwebtoken.sign({
            id: lease._id,
            id: User._id,
            is: propertys._id
        }, process.env.PROPERTY_TOKEN )

        await lease.save();
        
        
        const initializeTransaction = await paystack.transaction.initialize({
            email: propertyId,
            amount: amount * 100,
            plan: `${process.env.PAYSTACK_PLAN_CODE}`,
            channels: ['card'], // limiting the checkout to show card, as it's the only channel that subscriptions are currently available through
            callback_url: `${process.env.SERVER_URL}/account.html`,
          });
        
          if (initializeTransaction.status === false) {
            return console.log(
              'Error initializing transaction: ',
              initializeTransaction.message
            );
          }
        lease.payments.push({ amount, date: new Date() });
        await lease.save();

        res.json({ msg: 'Payment successful',
             initializeTransaction,
             lease });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.payLease = async (req, res) => {
    
    try {
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
