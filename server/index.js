const express = require("express")
const app = express()
const port = 3000


// app.get(‘/’, (req, res) => {
//   res.send(‘Hello World!’)
// })

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json())


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})