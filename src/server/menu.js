const express = require('express');
const router = express.Router()

const fs = require('fs');

// menu.json 파일을 읽어서 menuList에 저장
router.get('/', (req, res, next) => {
  const menuList = JSON.parse(fs.readFileSync('src/data/menu.json'));
  res.render('menu', { menuList });
});

module.exports = router;