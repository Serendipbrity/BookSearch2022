// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs to define queries
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: Int
  }
  type Query {
      me: User
      users: [User]
      user(username: String!): User
      books(username: String): [Book]
      book(_id: ID!): Book
  }
    type Book {
        authors: String
        description: String
        bookId: Int
        image: String
        link: String
        title: String
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addBook(_id: ID!, description: String!, title: String!, author: String!): User
        removeBook(_id: ID!, username: String!,email: String!, author: String!, bookCount: Int):User
    }
    type Auth {
        token: ID!
        user: User
    }
`;

// export the typeDefs
module.exports = typeDefs;