const { log } = require('console')
const os = require('os-utils')
const setFloor = (num) => {
  return ~~(num * 10000) / 100
}

const getCPUUsage = () => {
  return new Promise((resolve, reject) => {
    os.cpuUsage((v) => {
      resolve(setFloor(v))
    })
  })
}

const getFreeMemory = () => {
  return setFloor(1 - os.freememPercentage())
}

const getFreeDisk = () => {
  return setFloor(os.freeDisk())
}

const getSystemInfo = async () => {
  const cpuUsage = await getCPUUsage()
  const freeMemory = getFreeMemory()
  // const freeDisk = getFreeDisk()
  return {
    cpuUsage,
    freeMemory,
    // freeDisk
  }
}

module.exports = {
  getSystemInfo
}