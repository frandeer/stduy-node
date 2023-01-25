require('dotenv').config()

const mongoose = require('mongoose')
const USER = process.env.MONGO_USERNAME
const PWD = process.env.MONGO_PASSWORD
const HOST = 'localhost:27017'
const DB = 'sensor'
const mongodbURL = `mongodb://${USER}:${PWD}@${HOST}/${DB}`
mongoose.set('strictQuery', true)
mongoose.connect(mongodbURL, { useNewUrlParser: true })
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err))

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = mongoose