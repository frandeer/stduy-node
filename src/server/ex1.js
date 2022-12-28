// @ts-check

const express = require('express');

const app = express();

const PORT = 3000;


app.use('/', (req, res, next) => {
  console.log('middleware 1');
  
  // @ts-ignore
  req.code = '1234'

  next()
});

app.use((req, res, next) => {
  console.log('middleware 2');
  res.send(`Sorry cant find that! ${req.code}`);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});