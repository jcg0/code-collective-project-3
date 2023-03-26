const { AuthenticationError } = require('apollo-server-express');
const { User, Post, Profile } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('posts').populate('profile');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('posts').populate('profile');;
    },
    me: async (parent, args, context) => {
      if (context.user) {
          return User.findOne({ _id: context.user._id }).populate('posts').populate('profile');
      }
      throw new AuthenticationError('Please log in to use this feature.');
    },
    getAllProfiles: async (parent, { username }, context) => {
      if (context.user) {
        const params = username ? {username} : {}
        return Profile.find(params)
      }
      throw new AuthenticationError('Please log in to see profiles.')
    },
    getProfileById: async (parent, { profileId }, context) => {
      if (context.user) {
        return Profile.findOne({ _id: profileId })
      }
      throw new AuthenticationError('Please log in to see profiles.')
    },
    posts: async (parent, {username}, context) => {
      if (context.user) {
        const params = username ? username : {}
        return Post.find(params)
      }
      throw new AuthenticationError('Please log in to see posts');
    },
    userPosts: async (parent, { postAuthor }, context) => {
      if (context.user) {
        return Post.find({ postAuthor });
      }
    },
    // friendsList: async (parent, args, context) => {

    // }
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password');
      }

      const token = signToken(user);

      return { token, user };
    },
    updateProfile: async (parent, { bio, skills, interests, avatar, websites, location }, context) => {
      if (context.user) {
        // console.log(profile)
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $set: {
              profile: { bio, skills, interests, avatar, websites, location }
            }
          },
          {
            new: true
          },
        )
        .populate('profile');
      }
      throw new AuthenticationError('Please log in to update profile.')
    },
  },
};

module.exports = resolvers;
