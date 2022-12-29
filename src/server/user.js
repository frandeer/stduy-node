const express = require('express');
const router = express.Router()

const multer = require('multer');

const upload = multer({ dest: 'uploads/' })

const users = {
  1: { 
    id: 1, 
    name: 'John',
    avatar: '/uploads/1060c52876c58987efef0e6b24a8a935',
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

  console.log(req.file);

  const { id } = req.params;
  const user = users[id];

  const {fileName, path } = req.file;
  // user.avatar = fileName;
  user.avatar = "/" + path;

  // const { id } = req.params;
  // const { file } = req;
  
  // user.avatar = file.path;
  res.redirect(`/user/${id}/profile`);
});




// userRouter.get('/:id', (req, res, next) => {
//   res.send(`user param: ${req.params.id}`);
// });


module.exports = router;