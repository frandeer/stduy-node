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

const utils = require('../utils')()
const mongo = require('./mongo')
const PORT = process.env.PORT || 8080
const log = console.log
// const middleware = require('./middleware/logging.js')


app.use(cors())
app.use(express.json())
app.set('view engine', 'ejs'); //'ejs'탬플릿을 엔진으로 한다.
app.set('views', path.join(__dirname, 'views')); //폴더, 폴더경로 지정

// controller
const PcController = require('./controller/PcController')

const main = async () => {

  app.get('/', (req, res) => {
    res.render('index', { isMongo: mongo.isConnected ? '연결' : '연결안됨' })
  })

  io.on('connection', (socket) => {
    log('a user connected');
    // userList.push(socket.id)

    socket.on('disconnect', () => {
      log('user disconnected');
      // userList = userList.filter(user => user.socket !== socket);
    });
  });

  setInterval(async () => {

    PcController.getSystemInfo().then((data) => {
      // log(`Send to user Current Sensor And Save DB :: ${data.cpuUsage}`)
      console.dir(data)

      io.emit("sensorData", data)
    })

    // // random number
    // const random = Math.floor(Math.random() * 100)
    // log(`Send to user Current Sensor And Save DB :: ${utils.getDate()} ${random}`)

    // io.emit("sensorData", random)
  }, 1000 * 60)


  http.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
  })
}

main()