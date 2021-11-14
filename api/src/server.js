import Hapi from '@hapi/hapi'

import config from './config.js'

const port = config.port || 4000
const host = config.host || 'localhost'

const server = Hapi.server({
  port,
  host,
})

export default server
