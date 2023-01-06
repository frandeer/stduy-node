const { ApolloServer, gql } = require('apollo-server');
const { User, City, sequelize } = require('./sequelize');

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
    users: [User]
  }

  type Query {
    users(search: String): [User]
  }


`;



const resolvers = {
  Query: {
    users: async (_, { search }) =>
      User.findAll()
  },

  User: {
    city: async (user) => {

      return City.findOne({
        where: {
          id: user.city_id
        }
      }
      )
    }
  },

  City: {
    users: async (city) => {
      return User.findAll({
        where: {
          city_id: city.id
        }
      })
    }
  }
};



async function main() {

  await sequelize.sync({ force: true });

  const seoul = await City.build({
    name: 'Seoul'
  }).save();


  await User.build({
    name: 'John',
    age: 20,
    city_id: seoul.getDataValue('id')
  }).save();

  await User.build({
    name: 'Jane',
    age: 30
  }).save();

  await User.build({
    name: 'Jack',
    age: 40,
    city_id: seoul.getDataValue('id')
  }).save();

  const server = new ApolloServer({ typeDefs, resolvers });

  server.listen(5000).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

main()