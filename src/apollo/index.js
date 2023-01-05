const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`

  type Book {
    title: String
    author: String
  }

  type Query {
    books(search: String): [Book]
  }

  type Mutation {
    addBook(title: String!, author: String!): Book
  }
`;

const book = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
  }
]

const resolvers = {
  Query: {
    books: (_, { search }) =>
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