const db = require('../models')
const User = db.user

// Create new user
async function create(req, res, next) {
  try {
    const { email, password, type } = req.body
    const newUser = new User({ email, password, type })
    await newUser
      .save()
      .then((newDoc) => res.status(201).json(newDoc))
      .catch((error) => next(error))
  } catch (error) {
    next(error)
  }
}

// Find
async function find(req, res, next) {
  try {
    const users = await User.find({})
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}

async function findById(req, res, next) {
  try {
    const { id } = req.params
    const users = await User.findById(id)
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}

async function findByEmail(req, res, next) {
  try {
    const { email } = req.params
    const users = await User.findOne({ email })
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}

async function update(req, res, next) {
  try {
    const { id } = req.params
    const { email, password, type } = req.body
    const user = new User({ _id: id, email, password, type })
    const updatedUser = await User.findByIdAndUpdate(id, user)
    res.status(200).json(updatedUser)
  } catch (error) {
    next(error)
  }
}

async function del(req, res, next) {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
      res.status(404).json({ message: 'User not found' })
    } else {
      await User.deleteOne({ _id: id })
      res.status(200).json({ message: 'User deleted' })
    }
  } catch (error) {
    next(error)
  }
}

const UserController = {
  create,
  find,
  findById,
  findByEmail,
  update,
  del
}

module.exports = UserController
