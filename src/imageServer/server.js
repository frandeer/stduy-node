// express image server

var express = require('express');
var app = express();
var path = require('path');

app.use('/img', express.static(path.join(__dirname, 'img')))

app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});