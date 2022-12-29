
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
    setTimeout(() => {
      naverAPI.get(`/v1/search/image?display=1&query=${data.name}`).then((res) => {
        resolve({
          name: data.name,
          image: res.data.items[0].thumbnail,
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