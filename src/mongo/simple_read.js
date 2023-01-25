const mongoose = require('./mongo.js')

const Photo = require('./models/photo.js')

const getPhotos = async () => {
  const photos = await Photo.findOne({
    title: {
      $eq: '큰돌'
    },
    url: {
      $eq: 'jhc9639@naver.co2m'
    }
  }).lean()
  return photos
}

const main = async () => {
  const photos = await getPhotos()
  console.log(photos)
}

main()