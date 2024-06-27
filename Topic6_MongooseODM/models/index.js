const mongoose = require('mongoose')
const User = require('./user.model')

mongoose.Promise = global.Promise

const db = {}
db.user = User
db.connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME
    })
    .then(() => console.log('Connected to the database'))
    .catch((err) => {
      console.error('Cannot connect to the database:', err.message)
      process.exit()
    })
}

module.exports = db
