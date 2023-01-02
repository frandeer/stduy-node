// @ts-check

/* 키워드로 검색해서 나온 이미지를 원하는 사이즈로 리사이징해서 돌려주는 서버 */
const dotenv  = require("dotenv").config()

const {createApi} = require('unsplash-js');
const { default: fetch } = require('node-fetch');


const unsplash = createApi({
    accessKey: process.env.UNSPLASH_API_ACCESS_KEY,
    fetch
})

async function main() {
  const result = await unsplash.search.getPhotos({
    query: 'cat',
    perPage: 1,
    page: 1
  })
  console.log(result.response?.results[0].urls.small)
}

main()