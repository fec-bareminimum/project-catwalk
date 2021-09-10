const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// app.get(‘/’, (req, res) => {
//   res.send(‘Hello World!’)
// })

app.use(express.static(path.join(__dirname, 'client/dist')));
app.use(express.json());

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
