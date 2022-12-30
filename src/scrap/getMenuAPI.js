// 네이버 api를 이용한 검색

const cheerio = require('cheerio');
const axios = require('axios');
const getImage = require('./naverAPI');
const getMenu = require('./getMenu');

const fs = require('fs');
const path = require('path');

function start() {
  getMenu().then((res) => {
    const todayKorLunchList = res.todayKorLunch.split(',');
    const todayCouLunchList = res.todayCouLunch.split(',');

    let list = []
    for(var i = 0; i < todayKorLunchList.length; i++) {
      list.push({
        name: todayKorLunchList[i].trim(),
        type: '한식',
      })
    }

    for(var i = 0; i < todayCouLunchList.length; i++) {
      list.push({
        name: todayCouLunchList[i].trim(),
        type: '일품',
      })
    }

    // 한식 비동기로 데이터 받아오기
    const promises = list.map((el) => {
      el.date = res.today;
      var index = list.indexOf(el);
      return getImage(el, index * 500)
    })

    Promise.all(promises).then((data) => {
      // console.log(data);

      data.push({
        name: '내일의 한식',
        type: '내일한식',
        list: res.tomorrowKorLunch,
        date: res.tomorrow,
      })

      data.push({
        name: '내일의 일품',
        type: '내일일품',
        list: res.tomorrowCouLunch,
        date: res.tomorrow,
      })


      fs.writeFileSync(path.join(__dirname, '../data/menu.json'), JSON.stringify(data));
    }).catch((err) => {
        console.log(err);
    })

  })

}

module.exports = start