

const mongoose = require("mongoose")



const userSchema = new mongoose.Schema({
    
  fullname: {
    type: String,
    required: true,
    minLength: 6,

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
  image:{
    type: String,
    default: ""
    
  },

},
{ timestamps: true }
);
  

const Users = new mongoose.model("Users", userSchema)

module.exports = Users