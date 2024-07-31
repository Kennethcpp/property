const mongoose = require('mongoose');
const { Schema } = mongoose;


const messageSchema = new Schema({
    _id: { 
      type: mongoose.Schema.Types.ObjectId,
       default: () => new mongoose.Types.ObjectId() 
      },
    text: { 
      type: String, 
      required: true 
    },
    userId: {
       type: mongoose.Schema.Types.ObjectId, 
       required: true,
        ref: 'User' 
      },
    chatId: {
       type: mongoose.Schema.Types.ObjectId, 
       required: true, 
       ref: 'Chat' 
      },
  },
  { timestamps: true }
);
  
  

  const Messages = mongoose.model('Messages', messageSchema);

module.exports = Messages;