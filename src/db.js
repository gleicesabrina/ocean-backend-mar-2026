import { MongoClient, ObjectId as MongoObjectId } from 'mongodb'
import dotenv from 'dotenv'

// load .env file if present
dotenv.config()

// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------
// Replace the value below with your MongoDB Atlas connection string. You can
// also supply it via the MONGODB_URI (preferred) or MONGODB_URL environment
// variable when running the application. For example:
//
//   export MONGODB_URI="mongodb+srv://<user>:<password>@cluster0.mongodb.net"
//
// The `.env` file in the repository already contains a sample variable named
// `MONGODB_URL`; if you keep that name the code will read it as well.
// -----------------------------------------------------------------------------
const MONGODB_URL =
  process.env.MONGODB_URI || process.env.MONGODB_URL ||
  '<YOUR_MONGODB_ATLAS_CONNECTION_STRING>'
const DB_NAME = 'ocean-backend-mar-2026'

if (MONGODB_URL.includes('<YOUR_MONGODB_ATLAS_CONNECTION_STRING>')) {
  console.warn(
    'MongoDB connection string still contains placeholder, the application will ' +
      'fail to start until you set MONGODB_URI or MONGODB_URL.'
  )
}

let client
let db

async function connect () {
  if (db) return db

  if (!MONGODB_URL || MONGODB_URL.includes('<')) {
    throw new Error(
      'MongoDB URI is not configured. Set MONGODB_URI (or MONGODB_URL) in the environment or .env file.'
    )
  }

  client = new MongoClient(MONGODB_URL)
  await client.connect()
  db = client.db(DB_NAME)
  return db
}

function getCollection (name) {
  if (!db) {
    throw new Error('Database not initialized. Call connect() first.')
  }
  return db.collection(name)
}

// re-export ObjectId helper so callers don't need to import from mongodb
const ObjectId = MongoObjectId

export { connect, getCollection, ObjectId }
