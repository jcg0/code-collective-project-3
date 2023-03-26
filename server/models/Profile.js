const { Schema } = require('mongoose');

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
  interests: [
    {
      type: String,
      trim: true,
    }
  ],
  avatar: {
    type: String,
    trim: true,
  },
  location: {
    type: String, 
    trim: true,
  },
  websites: [
    {
      type: String,
      trim: true, 
      match: [/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
      , 'URL address must begin with https://']
    }
  ],
  // user: {
  //   type: Schema.Types.ObjectId, 
  //   ref: 'User', 
  // },
  // friendsList: [userSchema]
});

// const Profile = model('Profile', profileSchema);

module.exports = profileSchema;