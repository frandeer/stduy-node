const express = require('express')
const app = express()

const axios = require('axios')
const cheerio = require('cheerio')

const PORT = 12010

const Nightmare = require('nightmare')
const nightmare = Nightmare({
  show: false,
});

const cors = require('cors')
app.use(cors())
const vo = require('vo')
const DAY_BASE_URL = 'https://finance.naver.com/item/main.nhn?code='
const SISE_BASE_URL = 'https://finance.naver.com/item/sise_day.nhn?code='
const companyList = [{
  name: "한화시스템",
  code: "272210"
},
{
  name: "동화약품",
  code: "000020"
}]

function* reqDays(url, name) {
  const resource = yield nightmare
    .goto(url)
    .evaluate(() => document.body.innerHTML)
  const $ = cheerio.load(resource)
  const ret = []
  $('tr').each((idx, element) => {
    const tds = $(element).find('td')
    const date = $(tds[0]).find('span').eq(0).text().trim()
    if (date.length === 0 || idx == 16) return;
    const value = $(tds[1]).find('span').eq(0).text().trim()
    const increaseOrdecrease = $(tds[2]).find('span').eq(0).text().trim()
    const isInc = $(tds[2]).find('span').eq(0).attr('class').includes("red02")
    ret.push({
      date,
      value,
      increaseOrdecrease,
      isInc
    })
  });
  return ret
}
const run = function* () {
  let ret = {}
  for (let company of companyList) {
    const name = company.name
    const code = company.code

    const a = yield* reqDays(SISE_BASE_URL + code, name)
    const obj = {
      [name]: a
    }
    ret = {
      ...ret,
      ...obj
    }
  }
  return ret
}

const getDays = async (url, name) => {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(response => {
        const $ = cheerio.load(response.data);
        const jsonData = $('.no_today').eq(0).text().trim().split('\n')[0];

        resolve({
          name: name,
          price: jsonData
        })

      })
      .catch(error => reject(error));
  })
}

app.get('/stocks/today', async (req, res) => {

  let result = []
  const list = companyList.map(c => getDays(DAY_BASE_URL + c.code, c.name));
  const ret = await Promise.all(list)

  const obj = ret.reduce((acc, curr) => {
    // 숫자로 변환
    curr.price = Number(curr.price.replace(/,/g, ''))
    acc[curr.name] = curr.price
    return acc
  }, {})

  res.send(obj)
})


app.get('/stocks/days', (req, res) => {
  vo(run)(function (err, data) {
    if (err) console.log(`err : ${err}`)
    res.send(data)
  })
})


app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`)
})