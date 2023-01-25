const mongo = require('./mongo')

const csv = require('csvtojson')
const path = require('path')
const csvPath = path.join(__dirname, './data/sensor.csv')

const Sensor = require('./models/sensor')

const insertSensor = async () => {
  const sensorArray = await csv().fromFile(csvPath)

  // console.log(sensorArray);

  // await Sensor.insertMany(sensorArray, () => {
  //   console.log('inserted sensor data')
  // })
  await mongo.disconnect()
}

insertSensor()

