import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      firstName
      lastName
      friendsList{
        
        username
      }

      profile {
        _id
        bio
        skills
        interests
        # avatar
        websites
        location
      }
      posts {
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
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      firstName
      lastName
      friendsList{
        _id
        username
      }
      profile {
        _id
        bio
        skills
        interests
        # avatar
        websites
        location
      }
      posts {
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
  }
`;

// export const QUERY_POSTS = gql`
// query Users {
//   users {
//     posts {
//       _id
//       postContent
//       postAuthor
//       createdAt
//     }
//   }
// }
// `

export const QUERY_POSTS = gql`
  query Posts {
    posts {
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

export const QUERY_USER_POSTS = gql`
  query UserPosts($postAuthor: String!) {
    userPosts(postAuthor: $postAuthor) {
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

export const QUERY_USER_PROFILE = gql`
  query Query($username: String!) {
    user(username: $username) {
      _id
      username
      email
      profile {
        _id
        user
        bio
        skills
        interests
        # avatar
        location
        websites
      }
    }
  }
`;

export const QUERY_USER_FRIENDS = gql`
query Query($username: String!) {
  user(username: $username) {
    friendsList {
      username
    }
  }
}`
