const mongoose = require('mongoose')
const Schema = mongoose.Schema
const sensorSchema = new Schema({
  cnt: Number,
  id: Number,
  idx: Number,
  time: Date,
  temp: Number,
  Pwv: Number,
  humi: Number
})

module.exports = mongoose.model('Sensor', sensorSchema) 