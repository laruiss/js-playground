import Hapi from '@hapi/hapi'

import config from './config.js'

const port = config.port || 4000
const host = config.host || 'localhost'

const server = Hapi.server({
  port,
  host,
})

server.events.on('log', (event, tags) => {
  console.log(tags)
  if (tags.error) {
    console.log(`Server error: ${event.error ? event.error.message : 'unknown'}`)
  }
  if (tags.warn) {
    console.log(`Server warning: ${event.error ? event.error.message : 'unknown'}`)
  }
})

export default server
