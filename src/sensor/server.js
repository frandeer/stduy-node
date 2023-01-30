const constants = require('./constants');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  }
});
const log = console.log

const mongo = require('../node/mongo');
const util = require('./util')();
let userList = [], idx = 0;

app.use(cors());

const sensorController = require('./controller/sensorController')
const SENSOR_FILE_PATH = path.join(__dirname, './data/data.csv')

const main = async () => {

  const sensorList = await util.readCSV(SENSOR_FILE_PATH)
  const len = sensorList.length;

  app.get('/', (req, res) => {
    res.send({
      mongoState: mongo.isConnected
    })
  });

  io.on('connection', (socket) => {
    log('a user connected');
    userList.push(socket.id)

    socket.on('disconnect', () => {
      log('user disconnected');
      userList = userList.filter(user => user.socket !== socket);
    });
  });


  idx = await sensorController.sendDataAndSaveDB(io, sensorList, idx)
  // console.log(`Send to user Current Sensor And Save DB :: ${util.getDate()} ${JSON.stringify(sensorList[idx])}`)
  idx += 1

  const timeInterval = setInterval(async () => {
    idx = await sensorController.sendDataAndSaveDB(io, sensorList, idx)
    console.log(`Send to user Current Sensor And Save DB :: ${util.getDate()} idx = ${idx} ${JSON.stringify(sensorList[idx])}`)
    idx += 1
    if (idx === len) {
      console.log(`Close sensor Service :: ${util.getDate()}`)
      io.emit("closeSensorService", "byebye")
      clearInterval(timeInterval)
    }
  }, constants.INTERVAL)


  http.listen(constants.PORT, () => {
    log(`listening on http://localhost:${constants.PORT}`);
  });
}


main();