const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    firstName: String
    lastName: String
    profile: [Profile]
    posts: [Post]!
    friendsList: [User]
  }

  type Profile {
    _id: ID!
    user: String!
    bio: String!
    skills: [String]
    interests: [String]
    avatar: String
    location: String
    websites: [String]
    # username: User
    # friendsList: [User]
  }

  type Post {
    _id: ID
    postContent: String
    postAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    user(username: String!): User
    me: User
    # getAllProfiles(username: String!): [Profile]!
    # getProfileById(profileId: ID!): [Profile]
    # userPosts(postAuthor: String!): [Post]!
    # posts: [Post]!
    # friendsList: [User]!
    # post(postId: ID!): Post
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    # addProfile(
    #   bio: String!
    #   skills: [String]
    #   interests: [String]
    #   avatar: String
    #   websites: [String]
    # )
    updateProfile(
      # email: String!,
      # user: String!,
      bio: String!
      skills: [String]!
      interests: [String]!
      avatar: String!
      websites: [String]!
      location: String!
    ): Profile
    addPost(postContent: String!): Post
    updatePost(id: ID!, postContent: String!): Post
    removePost(postId: ID!): Post
    addComment(
      postId: ID!
      commentText: String! # commentAuthor: String!
    ): Post
    updateComment(postId: ID!, commentId: ID!, commentText: String!): Post
    removeComment(postId: ID!, commentId: ID!): Post
    addFriend(friendId: ID!): User
    removeFriend(friendId: ID!): User
  }
`;

module.exports = typeDefs;
