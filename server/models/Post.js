const { Schema, model } = require('mongoose');

const postSchema = new Schema({
  postTitle: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  postAuthor: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  comment: [commentSchema]
})

const Post = model('Post', postSchema);

module.exports = Post;