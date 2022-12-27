const cheerio = require('cheerio');
const axios = require('axios');


axios.get('https://today.jnu.ac.kr/Page/GetHtmlPage2.aspx').then((res) => {
  const htmlString = res.data;
  const $ = cheerio.load(htmlString);
  const h1 = $('.T_tableA').eq(1).find('tr').eq(1);
  console.log(h1.text());
  // console.log(htmlString);
});