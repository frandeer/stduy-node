// @ts-check

const express = require('express');
const app = express();

app.use(express.json())
app.use('/assets', express.static('src/public'))
// pug
app.set('views', 'src/views');
app.set('view engine', 'pug');

const userRouter = require('./user');
app.use('/user', userRouter);


app.get('/', (req, res, next) => {
  res.send('Hello World');
});

app.use((err, req, res, next) => {
  res.send(500, 'Something broke!');
});

module.exports = app;