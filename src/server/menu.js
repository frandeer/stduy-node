const express = require('express');
const router = express.Router()

const fs = require('fs');
const path = require('path');

// menu.json 파일을 읽어서 menuList에 저장
router.get('/', (req, res, next) => {
  const menuList = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/menu.json'), 'utf-8'));
  res.render('menu', { menuList });
});

module.exports = router;