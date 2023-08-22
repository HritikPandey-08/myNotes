const connectToMongo = require("./db")
const express = require('express')
connectToMongo();
const app = express()
var cors = require('cors') //CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const port = 5000;



// Adding middleware to send json file
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})