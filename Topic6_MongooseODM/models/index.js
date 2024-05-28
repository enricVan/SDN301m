const mongoose = require('mongoose')

const User = require('./user.model')

// Cau hinh cho mongoose su dung tren toan du an
mongoose.Promise = global.Promise

// Khai bao doi tuong dai dien csdl can lam viec cua mongodb server
const db = {}
db.mongoose = mongoose
db.User = User

module.exports = db
