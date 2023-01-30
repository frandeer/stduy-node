const mongoose = require('mongoose')
const Schema = mongoose.Schema
const logSchema = new Schema({
  remoteAddress: String,
  time: Date,
  method: String,
  url: String,
  contentType: String,
  responseTime: Number,

})

module.exports = mongoose.model('Log', logSchema)
