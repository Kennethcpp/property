

const mongoose = require("mongoose")



const userSchema = new mongoose.Schema({
    
  fullname: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 100

  },
  
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 6,
    maxLength: 255,
  },

  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 1024,
  },
  role: { type: String,
     enum: ['tenant', 'manager', 'owner'],
      required: true 
    },
  image:{
    type: String,
    default: ""
  },
  phoneNumber:{
    type: Number,
    require: false,
    minLength: 11,
    maxLength: 11
},
is_online: {
  type: Boolean,
  default: "0",
},
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
  

const Users = new mongoose.model("Users", userSchema)

module.exports = Users