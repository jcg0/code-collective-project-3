import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      profiles {
        _id
        bio
        skillsinterests
        avatar
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
      profiles {
        _id
        bio
        skillsinterests
        avatar
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

export const QUERY_POSTS = gql`
  query Query($username: String!) {
    posts(username: $username) {
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
  query Query()
`