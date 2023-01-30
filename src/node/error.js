const log = console.log
const app = require('express')()
const fs = require('fs')
const path = require('path')

const realPath = (file) => {
  return path.resolve(__dirname, file)
}

const wrapError = f => {
  return (req, res, next) => {
    f(req, res, next).catch(next)
  }
}

app.get("/a", wrapError(async (req, res, next) => {
  throw new Error("error")
}))

app.get("/", wrapError(async (req, res, next) => {
  fs.readFile(realPath("../data/menu.json2"), (err, data) => {
    if (err) {
      next(err)
    } else {
      res.send(data)
    }
  })
}))

app.use((err, req, res, next) => {

  switch (err.code) {
    case "ENOENT":
      res.status(404).send("Not Found")
      break;
    default:
      res.status(500).send(err.message)
      break;
  }
})

app.listen(3000, () => {
  log(`server started on http://localhost:3000`)
})