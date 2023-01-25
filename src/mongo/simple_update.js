const mongoose = require('./mongo.js')


const Photo = require('./models/photo.js')

const getPhotos = async () => {
  const photos = await Photo.updateMany({
    "title": {
      $eq: '큰돌2'
    }
  }, {
    $set: {
      "url": 'jhc9639@naver.com'
    }
  }, {
    upsert: true,
    multi: true,
    new: true
  }).lean()

  return photos
}

const main = async () => {
  const photos = await getPhotos()
  console.log(photos)
}

// main()


const main2 = async () => {
  const t = await Photo.updateMany({
    "title": {
      $in: ['큰돌', '홍철', '현영', '승철']
    }
  }, {
    $set: {
      "url": 'jhc9639@naver.kr'
    }
  }, {
    upsert: true,
    multi: true,
    new: true
  }).lean()
  console.log(t)
}
// main2()

const main3 = async () => {
  const t = await Photo.updateMany({
    "title": {
      $in: ['큰돌', '홍철', '현영', '승철']
    }
  }, {
    $push: {
      "something": {
        $each: [1, 2, 3]
      }
    }
  }, {
    upsert: true,
    multi: true,
    new: true
  }).lean()
  console.log(t)
}
// main3()

const main4 = async () => {
  const t = await Photo.updateOne({
    "title": {
      $eq: '큰돌'
    }
  }, {
    $set: {
      "url": 'jhc9639@naver.com'
    }
  }).lean()
  console.log(t)
}
main4() 
