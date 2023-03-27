const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat'); 

const postSchema = new Schema({
  postContent: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  postAuthor: {
    type: String, 
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now, 
    get: (timestamp) => dateFormat(timestamp), 
  },
  comments: [
    {
      commentText: {
        type: String, 
        required: true, 
        minLength: 1, 
        maxLength: 280,
      }, 
      commentAuthor: {
        type: String, 
        required: true,
      },
      createdAt: {
        type: Date, 
        default: Date.now, 
        get: (timestamp) => dateFormat(timestamp), 
      },
    },
  ],
});

const Post = model('Post', postSchema);

module.exports = Post;