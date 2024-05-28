const express = require('express')
const studentRouter = require('./routers/studentRouter')
const morgan = require('morgan')
require('dotenv').config()

const port = process.env.PORT || 3000
const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use('/students', studentRouter)

app.get('/', (req, res) => {
  res.send('Welcome to the Student API')
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
