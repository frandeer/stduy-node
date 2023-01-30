require('dotenv').config()

const mongoose = require('mongoose')
const USER = process.env.MONGO_USERNAME
const PWD = process.env.MONGO_PASSWORD
const HOST = 'localhost:27017'
const DB = 'sensor'
const mongodbURL = `mongodb://${USER}:${PWD}@${HOST}/${DB}`
mongoose.set('strictQuery', true)

mongoose.isConnected = false

mongoose.connect(mongodbURL, { useNewUrlParser: true })
  .then(() =>
    mongoose.isConnected = true
  )
  .catch((err) => console.error(err))

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

// 연결 끊어지면 다시 연결
mongoose.connection.on('disconnected', () => {
  mongoose.isConnected = false
  mongoose.connect(mongodbURL, { useNewUrlParser: true })
    .then(() =>
      mongoose.isConnected = true
    )
    .catch((err) => console.error(err))
})

module.exports = mongoose