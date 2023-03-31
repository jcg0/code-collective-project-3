import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        firstName
        lastName
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation Mutation(
    $bio: String!
    $skills: [String]!
    $interests: [String]!
    $avatar: String!
    $websites: [String]!
    $location: String!
  ) {
    updateProfile(
      bio: $bio
      skills: $skills
      interests: $interests
      avatar: $avatar
      websites: $websites
      location: $location
    ) {
      skills
      bio
      interests
      avatar
      location
      websites
    }
  }
`;

export const ADD_POST = gql`
  mutation AddPost($postContent: String!) {
    addPost(postContent: $postContent) {
      _id
      postAuthor
      postContent
      createdAt
      comments {
        _id
        commentAuthor
        commentText
        createdAt
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($updatePostId: ID!, $postContent: String!) {
    updatePost(id: $updatePostId, postContent: $postContent) {
      _id
      postAuthor
      postContent
      createdAt
      comments {
        _id
        commentAuthor
        commentText
        createdAt
      }
    }
  }
`;

export const REMOVE_POST = gql`
  mutation RemovePost($postId: ID!) {
    removePost(postId: $postId) {
      _id
      postAuthor
      postContent
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($postId: ID!, $commentText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
      _id
      postContent
      postAuthor
      comments {
        _id
        commentAuthor
        commentText
        createdAt
      }
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation UpdateComment($postId: ID!, $commentId: ID!, $commentText: String!) {
    updateComment(
      postId: $postId
      commentId: $commentId
      commentText: $commentText
    ) {
      _id
      postContent
      postAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation RemoveComment($postId: ID!, $commentId: ID!) {
    removeComment(postId: $postId, commentId: $commentId) {
      _id
      postContent
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation AddFriend($userID: ID! $username: String!) {
    addFriend(userId: $userId, username: $username ) {
      _id
      username
    }

  }
`;

export const REMOVE_FRIEND = gql`
  mutation RemoveFriend($userId: ID!, $friendID: ID!) {
    removeFriend(userID: ID, friendId: $friendID) {
      _id
      username
    }
  }
`;
