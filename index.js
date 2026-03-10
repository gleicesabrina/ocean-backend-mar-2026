import app from './src/app.js'
import { connect } from './src/db.js'

try {
  await connect()
} catch (err) {
  console.error('Failed to connect to database:', err.message)
  process.exit(1)
}

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
