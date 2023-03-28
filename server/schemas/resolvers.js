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
        const profile = await Profile.create({
          bio, skills, interests, avatar, websites, location
        });
        // console.log(profile)
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { profile: profile._id } },
          { new: true },
        )
        .populate('profile');

        return profile
      }
      throw new AuthenticationError('Please log in to update profile.');
    },

    addPost: async (parent, { postContent }, context) => {
      // console.log(context.user)
      if (context.user) {
        const post = await Post.create({
          postContent,
          postAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { posts: post._id} },
          { new: true, }
        );
        
        return post;
      }
      throw new AuthenticationError('Please log in to create a post.');
    },

    updatePost: async (parent, { postContent, postId }, context) => {
      console.log(context.user)
      if (context.user) {
        // he current code below isnt working 100% correctly and will need to be fixed.
        // you have to send the mutation twice for the request to send and the post content to change
        const post = await Post.findOneAndUpdate({
          postContent,
          postAuthor: context.user.username,
          posts: postId
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { posts: post._id } },
        );
          console.log(post)
        return post
      }
      throw new AuthenticationError('Please log in to update a post')
    },

    removePost: async (parent, { postId }, context) => {
      if (context.user) {
        const post = await Post.findOneAndDelete({
          _id: postId,
          postAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { posts: post._id } }
        );

        return post;
      }
      throw new AuthenticationError('Please log in to delete a post');
    },

    addComment: async (parent, {postId, commentText }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId},
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username }
            }
          },
          {
            new: true,
            runValidators: true,
          },
        );
      }
      throw new AuthenticationError('Please login to add a comment.');
    },

    removeComment: async (parent, { postId, commentId}, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('Please login to delete a comment.')
    },
  },
};

module.exports = resolvers;
