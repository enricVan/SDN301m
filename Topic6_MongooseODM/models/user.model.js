// Khai bao module 'mongoose'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Tao cau truc du lieu (schema) cua doi tuong user
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email is already taken']
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    type: {
      type: String,
      required: [true, 'Type is required']
    }
  },
  {
    timestamps: true
  }
)

// Tao ra model tu cau truc du lieu tren
const User = mongoose.model('users', userSchema)
module.exports = User
