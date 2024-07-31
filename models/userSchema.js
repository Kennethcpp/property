const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const { Schema } = mongoose;

const userSchema = new Schema({
  
  email: {
    type: String,
    unique: true,
    required: true
  },
  fullname: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    unique: true,
    required: true,
    minLength: 6,
    maxLength: 200
  },
  avatar: {
    type: String, 
    default: ""
  },
role: { type: String,
  enum: ['tenant', 'manager', 'owner'],
   required: true,
   default: "User",
 },
 chatIDs:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat'
 }],
 isVerified: {
  type: Boolean,
  default: false
},
emailToken: {
  type: String,
},
},
{ timestamps: true }
);




const User = mongoose.model('User', userSchema);

module.exports = User;





  




 

