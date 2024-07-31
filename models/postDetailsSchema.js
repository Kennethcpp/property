/* const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postDetailschema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  Descriptions: {
    type: String,
    required: true
  },
  utilities: {
    type: String,
    required: false
  },
  pet: {
    type: String,
    required: false
  },
  income: {
    type: String,
    required: false
  },
  size: {
    type: Number,
    required: false
  },
  school: {
    type: Number,
    required: false
  },
  bus: {
    type: Number,
    required: false
  },
  restaurant: {
    type: Number,
    required: false
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: false
  },
},
{ timestamps: true }
);

const PostDetail = mongoose.model('PostDetail', postDetailschema);

module.exports = PostDetail; */