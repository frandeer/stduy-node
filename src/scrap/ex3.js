
// 네이버 api를 이용한 검색

const cheerio = require('cheerio');
const axios = require('axios');
const getImage = require('./naverAPI');
const getMenu = require('./getMenu');

getMenu().then((res) => {
  const todayKorLunchList = res.todayKorLunch.split(',');
  const todayCouLunchList = res.todayCouLunch.split(',');

  // 한식 비동기로 데이터 받아오기
  const promises1 = todayKorLunchList.map((el) => {
    var name = el.trim();
    var index = todayKorLunchList.indexOf(el);
    return getImage(name, '한식', index * 500)
  })

  // 양식 비동기로 데이터 받아오기
  const promises2 = todayCouLunchList.map((el) => {
    var name = el.trim();
    return getImage(name, '일품')
  })  


  Promise.all(promises1).then((res) => {
    console.log(res);
  }).catch((err) => {
    // console.log(err);
  })  

})


     
