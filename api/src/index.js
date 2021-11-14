import server from './server.js'
import { start } from './app.js'

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

start(server)
