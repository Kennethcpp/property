const mongoose = require("mongoose")
const Schema = mongoose.Schema;



const chatSchema = new Schema({

    _id: {
       type: mongoose.Schema.Types.ObjectId, 
       default: () => new mongoose.Types.ObjectId() 
      },
    userIDs: [{ 
      type: mongoose.Schema.Types.ObjectId,
       ref: 'User' 
      }],
    seen_by: [{
       type: mongoose.Schema.Types.ObjectId 
      }],
    messages: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Message' 
    }],
    last_message: { 
      type: String 
    }
  });
  

  const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;