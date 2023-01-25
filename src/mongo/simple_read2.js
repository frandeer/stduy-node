const mongoose = require('./mongo.js')

const Photo = require('./models/photo.js')

const getPhotos = async () => {
  const photos = await Photo.findOne({
    $or: [
      {
        "title": {
          $eq: '큰돌1'
        }
      },
      {
        "url": {
          $eq: 'zagabi@naver.com'
        }
      }
    ]
  }).lean()
  return photos
}

const main = async () => {
  const photos = await getPhotos()
  console.log(photos)
}

main()