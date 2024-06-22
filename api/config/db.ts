import { warnLogger } from '../middlewares/logger'
import { getErrorMessage } from '../utils/errors.util'

const mongoose = require('mongoose')
require('dotenv').config()

const dbConnect = async () => {
  try {
    mongoose.set('strictQuery', false)

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      dbName: 'habitune_db_new',
    })
    warnLogger.warn(`Connected to: ${conn.connection.host}`)
    // console.log(`Connected to: ${conn.connection.host}`);
  } catch (error) {
    warnLogger.warn(`Database error: ${getErrorMessage(error)}`)
    // console.log(`Database error: ${getErrorMessage(error)}`);
    process.exit(1)
  }
}

export default dbConnect
