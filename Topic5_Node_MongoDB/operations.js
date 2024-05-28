const { ObjectId } = require('mongodb')

exports.findAll = async (db, collectionName) => {
  try {
    const collection = db.collection(collectionName)
    const documents = await collection.find({}).toArray()
    return documents
  } catch (error) {
    console.error('Error finding documents:', error)
    throw error
  }
}

exports.addDocument = async (db, collectionName, document) => {
  try {
    const collection = db.collection(collectionName)
    const result = await collection.insertOne(document)
    return result
  } catch (error) {
    console.error('Error adding document:', error)
    throw error
  }
}

exports.updateDocument = async (db, collectionName, id, updates) => {
  try {
    const collection = db.collection(collectionName)
    const result = await collection.updateOne(
      { _id: ObjectId(id) },
      { $set: updates }
    )
    return result
  } catch (error) {
    console.error('Error updating document:', error)
    throw error
  }
}

exports.deleteDocument = async (db, collectionName, id) => {
  try {
    const collection = db.collection(collectionName)
    const result = await collection.deleteOne({ _id: ObjectId(id) })
    return result
  } catch (error) {
    console.error('Error deleting document:', error)
    throw error
  }
}
