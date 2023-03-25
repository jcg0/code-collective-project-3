const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
  bio: {
    type: String,
    trim: true,
  },
  skills: [
    {
      type: String,
      trim: true,
    }
  ],
  avatar: {
    type: String,
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId, 
    ref: 'User', 
  },
  friendsList: [userSchema]
});

const Profile = model('Profile', profileSchema);

module.exports = Profile;