const { Sequelize } = require('sequelize');


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


module.exports = {
  sequelize,
  User,
  City
};