const { ApolloServer, gql } = require('apollo-server');
const { Sequelize, DataTypes } = require('sequelize');

const typeDefs = gql`

  type User {
    id: Int!
    name: String!
    age: Int!
    city: City
  }

  type City {
    id: Int!
    name: String!
  }

  type Query {
    users(search: String): [User]
  }

  type Mutation {
    addBook(title: String!, author: String!): Book
  }
`;



const resolvers = {
  Query: {
    users: async (_, { search }) =>
      book.filter(b => b.title.includes(search) || b.author.includes(search)),
  },
  Mutation: {
    addBook: (_, { title, author }) => {
      const newBook = { title, author };
      book.push(newBook);
      return newBook;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(5000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});