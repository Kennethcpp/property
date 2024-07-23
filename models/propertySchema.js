 const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    owner: { type: String,
     ref: 'User', 
     required: true 
    },
    manager: { type: String,
     ref: 'User', 
     required: false 
    },
    tittle:{
        type: String,
        require: true
    },
    location: { type: String,
     required: true 
    },
    size:{
        type: String,
        require: true
    },
    description: { type: String,
     required: true 
    },
    amenities: { type: [String],
     required: true },
    leaseWorth: { type: Number, 
    required: false 
    },
    salePrice: { type: Number,
     required: false 
    },
    isAvailable: { type: Boolean, 
    default: true 
    },
    forSale: { type: Boolean, 
    default: true
    },
    isAdmin: {
        type: Boolean, 
        default: false 
       }
});
 
const Property = new mongoose.model("Property", PropertySchema)
module.exports = Property

//module.exports = mongoose.model('Property', PropertySchema);
 