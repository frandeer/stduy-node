const fs = require('fs');
const path = require('path');

const JSON_FILE =  path.join(__dirname, '../data/menu.json')

function getJsonFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(JSON_FILE, 'utf-8', (err, data) => {
      if(err) reject(err);
      resolve(JSON.parse(data));
    })
  })
}

function setJsonFile(data) {
  fs.writeFile(JSON_FILE, JSON.stringify(data), function (err) {
    if (err) {
        console.dir('json File Write Error', err);
        return;
    }
  });
}


module.exports = {
  getJsonFile,
  setJsonFile,
}
