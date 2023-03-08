const cheerio = require('cheerio');
const axios = require('axios');
const dayjs = require('dayjs');


function main() {

  const today = dayjs().format('MM-DD')
  const tomorrow = dayjs().add(1, 'day').format('MM-DD')

  return new Promise((resolve, reject) => {
    axios.get('https://cnutoday.jnu.ac.kr/Program/MealPlan.aspx').then((res) => {

      let menu = {
        today: today,
        todayKorLunch: '',
        todayCouLunch: '',
        tomorrow: tomorrow,
        tomorrowKorLunch: '',
        tomorrowCouLunch: '',
      };

      const htmlString = res.data;
      const $ = cheerio.load(htmlString);

      $('.type1').eq(1).find('tr').each((i, el) => {
        const h1 = $(el).text();
        if (h1.includes(today)) {
          menu.todayKorLunch = $(el).find('td').eq(2).text()
        }
        if (h1.includes(tomorrow)) {
          menu.tomorrowKorLunch = $(el).find('td').eq(2).text()
        }
      });

      $('.type1').eq(2).find('tr').each((i, el) => {
        const h1 = $(el).text();
        if (h1.includes(today)) {
          menu.todayCouLunch = $(el).find('td').eq(2).text()
        }
        if (h1.includes(tomorrow)) {
          menu.tomorrowCouLunch = $(el).find('td').eq(2).text()
        }
      });
      resolve(menu)
    });
  }).catch((err) => {
    console.log(err);
    reject(err);
  })
}



module.exports = main;





