// @ts-check

const express = require('express');
const app = express();

app.use(express.json())
app.use('/assets', express.static('src/public'))
app.use('/uploads', express.static('uploads'))
// pug
app.set('views', 'src/views');
app.set('view engine', 'pug');

const userRouter = require('./user');
app.use('/user', userRouter);

const menuRouter = require('./menu');
app.use('/menu', menuRouter);


app.get('/', (req, res, next) => {
  res.send('Hello World');
});

app.use((err, req, res, next) => {
  console.log('====================================');
  console.log(err);
  console.log('====================================');
  res.send(500, err);
});

const cron = require('node-cron');
const getMenuApi = require('../scrap/getMenuAPI');


cron.schedule('0 0 2 * * *', () => {
  console.log('메뉴 api 실행 :', new Date().toISOString());
  getMenuApi()
});

module.exports = app;