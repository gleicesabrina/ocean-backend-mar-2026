import { connect, ObjectId } from '../db.js'

const COLLECTION = 'personagens'

async function getAll () {
  const db = await connect()
  return db.collection(COLLECTION).find().toArray()
}

async function getById (id) {
  const db = await connect()
  return db.collection(COLLECTION).findOne({ _id: new ObjectId(id) })
}

async function create (personagem) {
  const db = await connect()
  const result = await db.collection(COLLECTION).insertOne(personagem)
  return result.insertedId
}

async function update (id, personagem) {
  const db = await connect()
  await db.collection(COLLECTION).updateOne(
    { _id: new ObjectId(id) },
    { $set: personagem }
  )
  return getById(id)
}

async function remove (id) {
  const db = await connect()
  const result = await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) })
  return result.deletedCount > 0
}

const isValidId = (id) => ObjectId.isValid(id)

export { getAll, getById, create, update, remove, isValidId }
