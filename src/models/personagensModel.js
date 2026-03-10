import { MongoClient, ObjectId } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI
const DATABASE_NAME = 'ocean-backend-mar-2026'
const COLLECTION_NAME = 'personagens'

if (!MONGODB_URI) {
  throw new Error('Defina a variavel de ambiente MONGODB_URI com a string de conexao do MongoDB Atlas.')
}

const client = new MongoClient(MONGODB_URI)

const getCollection = async () => {
  await client.connect()
  return client.db(DATABASE_NAME).collection(COLLECTION_NAME)
}

const getAll = async () => {
  const collection = await getCollection()
  return collection.find().toArray()
}

const getById = async (id) => {
  const collection = await getCollection()
  return collection.findOne({ _id: new ObjectId(id) })
}

const create = async (personagem) => {
  const collection = await getCollection()
  const resultado = await collection.insertOne(personagem)
  return collection.findOne({ _id: resultado.insertedId })
}

const update = async (id, personagem) => {
  const collection = await getCollection()

  const resultado = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: personagem },
    { returnDocument: 'after' }
  )

  return resultado
}

const remove = async (id) => {
  const collection = await getCollection()

  const resultado = await collection.findOneAndDelete({
    _id: new ObjectId(id)
  })

  return resultado
}

const isValidId = (id) => ObjectId.isValid(id)

export { getAll, getById, create, update, remove, isValidId }
