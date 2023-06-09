const { AuthenticationError } = require('apollo-server-express');
const { User, Post, Profile } = require('../models');
const { signToken } = require('../utils/auth');
const ObjectId = require('mongodb').ObjectId

const resolvers = {
  Query: {
    potentialFriends: async (parent, args, context) => {
      if (context.user) {
        const friendsList = await User.findOne({
          _id: context.user._id,
        });
        console.log(friendsList.friendsList);
        const potentialFriends = await User.find({
          _id: { $nin: friendsList.friendsList, $ne: context.user._id },
        });
        return potentialFriends;
      }
      throw new AuthenticationError("Please log in to see potential friends");
    },
    users: async () => {
      return User.find()
        .populate("posts")
        .populate("profile")
        .populate("friendsList");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .populate("posts")
        .populate("profile")
        .populate("friendsList");
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate("posts")
          .populate("profile")
          .populate("friendsList");
      }
      throw new AuthenticationError("Please log in to use this feature.");
    },
    posts: async (parent, { username }, context) => {
      if (context.user) {
        const params = username ? username : {};
        return Post.find(params);
      }
      throw new AuthenticationError("Please log in to see posts");
    },
  },

  Mutation: {
    addUser: async (
      parent,
      { username, email, password, firstName, lastName }
    ) => {
      const user = await User.create({
        username,
        email,
        password,
        firstName,
        lastName,
      });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password");
      }

      const token = signToken(user);

      return { token, user };
    },

    updateProfile: async (
      parent,
      { bio, skills, interests, websites, location },
      context
    ) => {
      if (context.user) {
        const profile = await Profile.create({
          bio,
          skills,
          interests,
          websites,
          location,
        });
        // console.log(profile)
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { profile: profile._id } },
          { new: true }
        ).populate("profile");

        return profile;
      }
      throw new AuthenticationError("Please log in to update profile.");
    },

    addPost: async (parent, { postContent }, context) => {
      if (context.user) {
        const post = await Post.create({
          postContent,
          postAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { posts: post._id } },
          { new: true }
        );

        return post;
      }
      throw new AuthenticationError("Please log in to create a post.");
    },

    updatePost: async (parent, { id, postContent }, context) => {
      console.log(context.user);
      if (context.user) {
        const post = await Post.findOneAndUpdate(
          { _id: id },
          { postContent },
          { new: true }
        );

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { posts: post._id } }
        );
        console.log(post);
        return post;
      }
      throw new AuthenticationError("Please log in to update a post");
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
      throw new AuthenticationError("Please log in to delete a post");
    },

    addComment: async (parent, { postId, commentText }, context) => {
      if (context.user) {

        const findPost = await Post.findOne({
          _id: postId
        }); 

        console.log(findPost)

        const addComment = await Post.findByIdAndUpdate(
          { _id: postId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            // runValidators: true,
          }
        );
        console.log(addComment); 
        return addComment;

        // return Post.findOneAndUpdate(
        //   { _id: postId },
        //   {
        //     $addToSet: {
        //       comments: { commentText, commentAuthor: context.user.username },
        //     },
        //   },
        //   {
        //     new: true,
        //     runValidators: true,
        //   }
        // );
      }
      throw new AuthenticationError("Please login to add a comment.");
    },

    updateComment: async (
      parent,
      { postId, commentId, commentText },
      context
    ) => {
      console.log(context.user);
      if (context.user) {
        const comment = await Post.findOneAndUpdate(
          { _id: postId, "comments._id": commentId },
          { $set: { "comments.$.commentText": commentText } },
          { new: true }
        );

        console.log(comment);
        return comment;
      }
      throw new AuthenticationError("Please log in to update a post");
    },

    removeComment: async (parent, { postId, commentId }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("Please login to delete a comment.");
    },

    addFriend: async (parent, { friendName }, context) => {
      if (context.user) {

        const findFriend = await User.findOne({
          username: friendName
        
        })
        console.log(findFriend._id)
        console.log(context.user._id)
        // const returnUser= await User.findById(
        //  context.user._id 
        // )
        const returnUser = await User.findByIdAndUpdate(
          context.user._id ,
          { $addToSet: { friendsList: findFriend._id } },
          { new: true, }
        );
        console.log(returnUser)
        return returnUser;
      }
      throw new AuthenticationError("Please log in to create a post.");
    },

    removeFriend: async (parent, { friendName }, context) => {
      const findFriend = await User.findOne({
        username: friendName
      
      })

      if (context.user) {
        const returnUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { friendsList: findFriend._id } },
          {new:true,}
        );

        return returnUser;
      }
      throw new AuthenticationError("Please log in to delete a post");
    },

    
  },
};



module.exports = resolvers;
