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
  friendsList: [userSchema]
});

const Profile = model('Profile', profileSchema);

module.exports = Profile;