require('dotenv').config()
// Khai bao doi tuong MongoClient tu module mongodb
const { MongoClient } = require('mongodb')

// Khoi tao doi tuong ket noi
const dbClient = new MongoClient(process.env.URL_MONGODB)

// Dinh nghia 1 ham xu ly ket noi co so du lieu, theo co che bat dong bo (async)
// return: Promise (onFullFill, onReject, onFinally)
async function connectDB() {
  // Tien hanh ket noi csdl
  await dbClient.connect()
  // Chi dinh csdl va collection can lam viec
  const dbName = dbClient.db(process.env.DB_NAME)
  const collection = dbName.collection(process.env.DB_NAME)

  // Thuc hien truy van du lieu
  // C - Create
  await collection.insertOne({
    fullname: 'Hoàng Phi Hồng',
    age: 20
  })
  // R - Read
  console.log('List of students: ')
  const studentList = collection.find({}).toArray()
  return studentList
}

// Thuc thi ket noi va nhan ket qua tra ve
// connectDB()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => dbClient.close())

//Express server
import studentRouter from './routers/studentRouter'

const express = require('express')
const port = process.env.PORT || 3000
const app = express()

app.use(express.json())

app.use('/students', studentRouter)
app.get('/', (req, res) => {
  connectDB()
    .then((studentList) => {
      console.log('List of students: ', studentList)
      res.send(studentList)
    })
    .catch(console.error)
    .finally(() => dbClient.close())
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
