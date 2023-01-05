const { Sequelize } = require('sequelize');

async function main() {

  const sequelize = new Sequelize({
    dialect: 'postgres',
    database: 'fc21',
    username: 'myuser',
    password: 'mypass',
    host: 'localhost',
  });

  const User = sequelize.define('users',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    },
    {
      timestamps: false
    });

  // city

  const City = sequelize.define('cities',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false
    });

  // user_city
  User.belongsTo(City, { foreignKey: 'city_id' });


  // force: true will drop the table if it already exists
  await sequelize.sync({ force: true });
  // alter: true will add new columns if they don't exist
  // await sequelize.sync({ alter: true });

  const newCity = await City.build({
    name: 'Bucharest'
  }).save();

  const newUser = await User.build({
    name: 'John',
    age: 30,
    city_id: newCity.getDataValue('id')
  }).save();

  await sequelize.authenticate();
  await sequelize.close();
}

main();