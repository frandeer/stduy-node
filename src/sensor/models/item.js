const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
  id: Number,
  title: String,
  price: Number,
})


const Item = mongoose.model('Item', ItemSchema)
module.exports = Item