const express = require('express');
const router = express.Router()

const multer = require('multer');

const upload = multer({ dest: 'uploads/' })

const users = {
  1: { 
    id: 1, 
    name: 'John',
    avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
  },
  2: { 
      id: 2, 
      name: 'Jane',
      avatar: undefined,
  },
}

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hey', message: 'Hello there!', users })
});

router.get('/:id/name', (req, res, next) => {
  const { id } = req.params;
  const user = users[id];
  res.send(user);
});

router.get('/:id/profile', (req, res, next) => {
 res.render('user-profile', { user: users[req.params.id] });
});

router.post('/:id/avatar', upload.single('avatar'), (req, res, next) => {
  const { id } = req.params;
  const { file } = req;
  const user = users[id];
  user.avatar = file.path;
  res.redirect(`/user/${id}`);
});




// userRouter.get('/:id', (req, res, next) => {
//   res.send(`user param: ${req.params.id}`);
// });


module.exports = router;