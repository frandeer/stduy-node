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

const mongo = require('./mongo');
let userList = [], idx = 0;





