const express = require("express")
const path = require("path")
const axios = require("axios")
const morgan = require("morgan")
const compression = require("compression")
const mcache = require("memory-cache")

const config = require("../config")
const app = express()
const port = 3000

// Apply middleware
app.use(compression())
app.use(express.static(path.join(__dirname, "../client/build")))
app.use(express.json())
app.use(morgan("tiny"))

// Create server-side cache
var cache = (duration) => {
  return (req, res, next) => {
    let key = "__express__" + req.originalUrl || req.url
    let cachedBody = mcache.get(key)
    if (cachedBody) {
      res.send(cachedBody)
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        mcache.put(key, body, duration * 1000)
        res.sendResponse(body)
      }
      next()
    }
  }
}

// Configure Proxy
app.get("/*", cache(10), (req, res) => {
  axios({
    url: req.url,
    // method: req.method,
    baseURL: "https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax",
    headers: {
      Authorization: config.API_TOKEN,
    },
    data: req.data,
  })
    .then((results) => {
      res.status(200).send(results.data)
    })
    .catch((err) => {
      console.log(err)
      res.status(400).send(err)
    })
})

app.post("/*", (req, res) => {
  axios({
    url: req.url,
    method: req.method,
    baseURL: "https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax",
    headers: {
      Authorization: config.API_TOKEN,
    },
    data: req.body,
  })
    .then((results) => {
      res.status(201).send(results.data)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
})

app.put("/*", (req, res) => {
  axios({
    url: req.url,
    method: req.method,
    baseURL: "https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax",
    headers: {
      Authorization: config.API_TOKEN,
    },
    data: req.body,
  })
    .then((results) => {
      res.status(201).send(results.data)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
