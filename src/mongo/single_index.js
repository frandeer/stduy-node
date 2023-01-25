const mongoose = require('./mongo.js')

// mongoose.set('useCreateIndex', true)

const Photo = require('./models/photo_index')


const main = async () => {
  console.time('id를 오름차순으로 찾기')
  const ret = await Photo.find().sort({ "id": 1 }).limit(100)
  console.timeEnd('id를 오름차순으로 찾기')
}

main()