const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    // password: String! 
    firstName: String! 
    lastName: String! 
    profile: Profile 
    posts: [Post]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Profile {
    _id: ID!
    bio: String
    skills: [Skill]
    avatar: String
    user: User
    friendsList: User
  }

  type Post {
    _id: ID!
    postTitle: String
    postAuthor: User
    createdAt: String
    comments: [Comment]!
  }

  type Query {
    users: [User]!
    user(username: String!): User
    me: User
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    posts: [Post]!
    userPosts(username: username!): [Post]!
    post(postId: ID!): Post
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateProfile(
      email: String!
      username: String!
    )
    addPost(postTitle: String!, postAuthor: String!): Thought
    updatePost(postId: ID!): Post
    removePost(postId: ID!): Post
    addComment(
      postId: ID!, 
      commentText: String!
      commentAuthor: String!
    ): Thought
    updateComment(commendId: ID!): Comment
    removeComment(postId: ID!, commentId: ID!): Post
  }
`;

module.exports = typeDefs;
