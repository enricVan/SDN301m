const express = require('express')
const morgran = require('morgan')
const bodyParser = require('body-parser')
const httpErrors = require('http-errors')
const db = require('./models')
const { UserRouter } = require('./routes')

require('dotenv').config()

// Todo: Dinh nghia Schema moi: Role {_id, name: ['admin', 'mod', 'member']}
// Update User Schema: Bo sung roles: [{type: schemaType.ObjectId, ref: 'Role'}]
// Model, Controller, Route: Role

// Khoi tao express web server
const app = express()
// Bo sung middleware
app.use(morgran('dev'))
app.use(bodyParser.json())

// Dinh tuyen root router
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to RESTFul API - NodeJS' })
})

app.use('/api/v1/users', UserRouter)

// Kiem soat cac loi
app.use(async (req, res, next) => {
  next(httpErrors.NotFound())
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
})

// Tiep nhan hoat dong lang nghe tren port
app.listen(process.env.PORT, process.env.HOST_NAME, () => {
  console.log(
    `Server is running at http://${process.env.HOST_NAME}:${process.env.PORT}`
  )
  // Ket noi den database
  db.connectDB()
})
