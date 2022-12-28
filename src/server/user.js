const express = require('express');
const userRouter = express.Router()

const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
]

userRouter.get('/', (req, res, next) => {
  res.render('index', { title: 'Hey', message: 'Hello there!', users })
});

userRouter.get('/profile', (req, res, next) => {
  res.json({
    name: 'John',
  })
});

// userRouter.get('/:id', (req, res, next) => {
//   res.send(`user param: ${req.params.id}`);
// });


module.exports = userRouter;