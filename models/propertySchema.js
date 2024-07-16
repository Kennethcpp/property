 const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId,
     ref: 'User', 
     required: true 
    },
    manager: { type: mongoose.Schema.Types.ObjectId,
     ref: 'User', 
     required: false 
    },
    location: { type: String,
     required: true 
    },
    description: { type: String,
     required: true 
    },
    amenities: { type: [String],
     required: true },
    photos: { type: [String],
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
    default: false 
    }
});
 
const Property = new mongoose.model("Property", PropertySchema)
module.exports = Property

//module.exports = mongoose.model('Property', PropertySchema);
 