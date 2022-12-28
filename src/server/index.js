// @ts-check

const express = require('express');
const app = express();
const PORT = 3000;

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


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});