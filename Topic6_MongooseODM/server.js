const db = require('./models/index')

const User = db.User

// Thuc hien ket noi csdl
db.mongoose
  .connect('mongodb://127.0.0.1', {
    dbName: 'SE1740_DB'
  })
  .then((dbResult) => {
    // Khai bao 1 doi tuong kieu User
    const newUser = new User({
      email: 'user1@gmail.com',
      password: '1234',
      type: 'Google'
    })

    // Luu newUser xuong collection 'users'
    newUser
      .save()
      .then((insertedUser) => {
        console.log('Inserted User: ')
        console.log(insertedUser)
        return User.find({})
      })
      .then((allUsers) => {
        console.log('List of Users:')
        console.log(allUsers)
      })
  })
  .catch((err) => {
    console.log('Error: ', err.message)
    process.exit()
  })
