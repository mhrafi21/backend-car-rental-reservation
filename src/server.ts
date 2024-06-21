import mongoose from 'mongoose'
import app from './app'
import config from './app/config'
import { Server } from 'http'
import AppError from './app/errors/AppError'
import httpStatus from 'http-status'

let server: Server

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('MongoDB connected successfully!')
    server = app.listen(config.port, () => {
      console.log(`The server is running at http://localhost:${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()
// for async uncaught error handling
process.on('unhandledRejection', (reason,promise) => {
  console.log(`Un handle rejection is detected at ${promise}, shutting down... reason:${reason}`)
  
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
})

// synchronous uncaught error handling

process.on('uncaughtException', (error) => {
  console.log(`UncoughtException is detected at ${error}, shouting down`)
  throw new AppError(httpStatus.INTERNAL_SERVER_ERROR,`UncaughtException: ${error}`)
  process.exit(1)
})
