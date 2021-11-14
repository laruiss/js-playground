import HapiAuthJwt2 from 'hapi-auth-jwt2'
import Blipp from 'blipp'
import devErrors from 'hapi-dev-errors'

import routes from './routes.js'
import authStrategyOptions from './auth/auth-strategy-options.js'

const apiPrefix = '/api/v1'

export const registerAuthStrategy = async (server) => {
  await server.register(HapiAuthJwt2)

  server.auth.strategy('jwt', 'jwt', authStrategyOptions)

  server.auth.default('jwt')
}

export const registerLogPlugins = async server => {
  // await server.register({
  //   plugin: hapiPino,
  //   options: {
  //     prettyPrint: process.env.NODE_ENV !== 'production',
  //     // Redact Authorization headers, see https://getpino.io/#/docs/redaction
  //     redact: ['req.headers.authorization'],
  //   },
  // })

  await server.register([
    {
      plugin: devErrors,
      options: {
        showErrors: process.env.NODE_ENV !== 'production',
      },
    },
    {
      plugin: Blipp,
      options: { showAuth: true },
    },
  ])
}

export const setRoutes = (server) => {
  server.route([
    ...routes.map(r => ({ ...r, path: `${apiPrefix}${r.path}` })),
  ])
}

export const init = async (server) => {
  setRoutes(server)
  await server.initialize()
  return server
}

export const start = async (server) => {
  await registerAuthStrategy(server)
  await registerLogPlugins(server)
  setRoutes(server)
  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
  return server
}
