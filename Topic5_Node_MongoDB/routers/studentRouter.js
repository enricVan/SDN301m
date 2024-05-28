const express = require('express')
const studentRouter = express.Router()
const operations = require('../operations')
require('dotenv').config()
const { MongoClient } = require('mongodb')

const dbClient = new MongoClient(process.env.URL_MONGODB)

async function connectDB() {
  await dbClient.connect()
  const db = dbClient.db(process.env.DB_NAME)
  return db
}

// Get all students
studentRouter.route('/').get((req, res) => {
  connectDB()
    .then((db) => {
      console.log('Connected to database')
      return operations.findAll(db, 'HE173334_students')
    })
    .then((studentList) => {
      console.log('List of students:', studentList)
      res.send(studentList)
    })
    .catch((error) => {
      console.error('Error retrieving student list:', error)
      res.status(500).send('Error retrieving student list')
    })
})

// Add a new student
studentRouter.route('/').post((req, res) => {
  const newStudent = req.body
  connectDB()
    .then((db) => {
      console.log('Connected to database')
      return operations.addDocument(db, 'HE173334_students', newStudent)
    })
    .then((result) => {
      console.log('Added new student:', result)
      res.status(201).send(result)
    })
    .catch((error) => {
      console.error('Error adding student:', error)
      res.status(500).send('Error adding student')
    })
})

// Update a student by ID
studentRouter.route('/:id').put((req, res) => {
  const studentId = req.params.id
  const updates = req.body
  connectDB()
    .then((db) => {
      console.log('Connected to database')
      return operations.updateDocument(
        db,
        'HE173334_students',
        studentId,
        updates
      )
    })
    .then((result) => {
      console.log('Updated student:', result)
      res.send(result)
    })
    .catch((error) => {
      console.error('Error updating student:', error)
      res.status(500).send('Error updating student')
    })
})

// Delete a student by ID
studentRouter.route('/:id').delete((req, res) => {
  const studentId = req.params.id
  connectDB()
    .then((db) => {
      console.log('Connected to database')
      return operations.deleteDocument(db, 'HE173334_students', studentId)
    })
    .then((result) => {
      console.log('Deleted student:', result)
      res.send(result)
    })
    .catch((error) => {
      console.error('Error deleting student:', error)
      res.status(500).send('Error deleting student')
    })
})

module.exports = studentRouter
