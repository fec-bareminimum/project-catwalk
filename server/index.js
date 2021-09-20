const express = require("express")
const path = require("path")
const axios = require("axios")
const config = require("../config")

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, "../client/dist")))
app.use(express.json())

app.get("/*", (req, res) => {
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

app.post("/cart", (req, res) => {
  console.log('<<<<<<<<<<', req.body)
  axios({
    url: req.url,
    method: req.method,
    baseURL: "https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax",
    headers: {
      Authorization: config.API_TOKEN,
      API_TOKEN: config.API_TOKEN,
      "Content-Type": "application/json"
    },
    data: req.body,
  })
    .then((results) => {
      res.status(200).send(results.data)
    })
    .catch((err) => {
      console.log(err)
      res.status(400).send(err)
    })
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
