const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PcSchema = new Schema({
  time: Date,
  cpu: Number,
  memory: Number
})

module.exports = mongoose.model('Pc', PcSchema)