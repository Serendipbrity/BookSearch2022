import { gql } from 'client/node_modules/@apollo/client';

export const QUERY_BOOKS = gql`
  query books($username: String) {
    books(username: $username) {
    author
    description
    bookId
    image
    link
    title
        }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      thoughts {
        _id
        thoughtText
        createdAt
        reactionCount
      }
    }
  }
`;

export const GET_ME = gql`
{
  me {
    _id
    username
    email
    bookCount
    addBook {
      _id
      description
      title
      author
    }
  }
}`