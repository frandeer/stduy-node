const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
  name: String,
  password: String,
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Item'
    }
  ]
})

module.exports = mongoose.model('User', ItemSchema)