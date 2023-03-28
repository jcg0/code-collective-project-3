const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const profileSchema = require('./Profile')

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  }, 
  firstName: {
    type: String, 
    // required: true,
    trim: true,
  }, 
  lastName: {
    type: String,
    // required: true, 
    trim: true,
  }, 
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    }
  ],
  profile: [
    {
      type: Schema.Types.ObjectId, 
      ref: 'Profile', 
    }
  ],
  
  // {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Profile',
  //   // required: true
  // }

  // friendsList: [userSchema]
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
