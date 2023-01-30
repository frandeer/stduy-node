const Log = require('../model/log')

exports.save = (json) => {
  const log = new Log(json)
  log.save()
}

exports.get = async (url, num) => {
  let ret = await Log.find({
    url: url
  }).sort({
    time: -1
  }).select({
    _id: 0,
    time: 1,
    responseTime: 1
  }).limit(num)

  ret.sort((a, b) => { new Date(a.time) - new Date(b.time) })
  return ret
}