const express = require('express');
const router = express.Router()

const getJsonFile = require('../scrap/jsonFile').getJsonFile;

// menu.json 파일을 읽어서 menuList에 저장
router.get('/', async(req, res, next) => {
  const menuList = await getJsonFile();
  res.render('menu', { menuList });
});

module.exports = router;