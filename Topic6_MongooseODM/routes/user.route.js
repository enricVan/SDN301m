const bodyParser = require('body-parser')
const express = require('express')
const { UserController } = require('../controllers')

const userRouter = express.Router()
userRouter.use(bodyParser.json())

userRouter.post('/create', UserController.create)
userRouter.get('/list', UserController.find)
//to do
userRouter.get('/:id', UserController.findById)
userRouter.get('/find/:email', UserController.findByEmail)
userRouter.put('/edit/:id', UserController.update)
userRouter.delete('/delete/:id', UserController.del)

module.exports = userRouter
