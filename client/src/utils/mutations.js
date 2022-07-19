import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// export const ADD_BOOK = gql`
// mutation addBook(  description: String!, title: String!, author: String!) {
// addBook( description: $description, title: $title, author: $author) {
//   author
//   description
//   title
// }
// }
// `;


// export const REMOVE_BOOK = gql`
// mutation removeBook(  description: String!, title: String!, author: String!) {
// addBook( description: $description, title: $title, author: $author) {
//   author
//   description
//   title
// }
// }
// `;