const fs = require('fs');
const path = require('path');

const JSON_FILE =  path.join(__dirname, '../data/menu.json')


// 비동기
function getJsonFile() {
  return new Promise((resolve, reject) => {

    fs.readFile(JSON_FILE, 'utf-8', (err, data) => {
      data = fs.readFileSync(JSON_FILE,'utf-8');
      if(err) reject(err);
      
      resolve(JSON.parse(data));
    })
  })
}

function setJsonFile(data) {
  fs.writeFileSync(JSON_FILE, JSON.stringify(data));
}


module.exports = {
  getJsonFile,
  setJsonFile,
}
