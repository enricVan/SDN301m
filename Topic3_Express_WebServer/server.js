const express = require('express')
const morgan = require('morgan')
require('dotenv').config()

const port = process.env.PORT || 9999
// Khoi tao 1 web server: express
const app = express()

// Dinh tuyen req tu client toi duong dan goc cua web server
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Thiet lap middleware cho web server
app.use(morgan('dev'))

// Khoi dong web server lang nghe req
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
