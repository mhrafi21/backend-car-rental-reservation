import mongoose from 'mongoose'
import app from './app'
import config from './app/config'
import { Server } from 'http'

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
process.on('unhandledRejection', () => {
  console.log('Un handle rejection is detected, shutting down...')
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
})

// synchronous uncaught error handling

process.on('uncaughtException', () => {
  console.log('UncoughtException is detected, shouting down')
  process.exit(1)
})
