
const axios = require('axios');

// 네이버 이미지 검색 API

const naverAPI = axios.create({
  baseURL: 'https://openapi.naver.com',
  headers: {
    'X-Naver-Client-Id': 'ZWZsVfceCmF1iNhPxZJt',
    'X-Naver-Client-Secret': 'BLgTBvdthg',
  },
});


function getImage(data, duration) {
  return new Promise((resolve, reject) => {

    if(!data.name) {
      new Error("Not Query.")
      reject('error')
    }

    setTimeout(() => {
      naverAPI.get(`/v1/search/image?display=1&query=${data.name}`).then((res) => {

        let thumbnail = ''
        let link = ''

        if(res.data.items[0] !== undefined) {
          if(typeof res.data.items[0].thumbnail !== undefined) {
            thumbnail = res.data.items[0].thumbnail
          }
          if(typeof res.data.items[0].link !== undefined) {
            link = res.data.items[0].link
          }
        }

        resolve({
          name: data.name,
          image: thumbnail,
          image2: link,
          type: data.type,
          date: data.date,
        })
      }).catch((err) => {
        reject(err);
      });
    }, duration);
  })
}

module.exports = getImage;