import server from './server.js'
import { start } from './app.js'
import { closeConnections, getConnection } from './connect.js'

/**
 * Ferme proprement les connexions à MongoDB en cas d'arrêt de l'application
 *
 * @async
 * @function
 *
 * @param {Error=} error - Error remontée dans le cas d'un arrêt suite à une erreur non gérée
 *
 * @returns {void}
 */
export async function exitGracefuly (error) {
  if (error instanceof Error) {
    console.error(error)
  }
  console.info('Closing connections...')
  await closeConnections()
  console.info('Exiting...')
  process.exit(error instanceof Error ? 1 : 0)
}

/**
 * Handle unexpected exits to exit gracefuly (close connections to DB)
 *
 * @function
 */
export function handleExit () {
  process.on('exit', exitGracefuly)

  // This will handle kill commands, such as CTRL+C:
  process.on('SIGINT', exitGracefuly)
  process.on('SIGTERM', exitGracefuly)

  // This will prevent dirty exit on code-fault crashes:
  process.on('uncaughtException', exitGracefuly)

  process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
  })
}

async function startAll () {
  try {
    await getConnection()
    start(server)
  } catch (error) {
    console.error(error.message)
    throw error
  }
}

startAll()

handleExit()
