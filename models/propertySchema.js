const mongoose = require('mongoose');
const { Schema } = mongoose;

const typeEnum = ['buy', 'rent'];
const propertyEnum = ['apartment', 'house', 'land'];

const propertySchema = new Schema({
  
  title: {
    type: String,                 
    required: true
  },
  price: {
    type: Number,
    required: true                                       
  },
  images: {
    type: [String],
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  bedroom: {
    type: Number,
    required: true
  },
  bathroom: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: typeEnum,
    required: true
  },
  property: {
    type: String,
    enum: propertyEnum,
    required: true 
  }, 
  userId: {
   type: Schema.Types.ObjectId,
   ref: 'User',
   required: true
  },
  isAvailable:{
    type: Boolean,
    default: true
  },
  isforSale:{
    type: Boolean,
    default: true
  },
},
{ timestamps: true }
);



const Property = mongoose.model('Property', propertySchema);

module.exports = Property;

