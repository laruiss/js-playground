/**
 * Gère les connexions et déconnexions à la base de données MongoDB
 * @module connect
 */

import mongoose from 'mongoose'
import delay from 'delay'

/** @type {boolean} */
const isTest = process.env.NODE_ENV === 'test'

/** @type {boolean} */
const isCI = process.env.CI === 'true'

/** @type {boolean} */
const DELAY_BEFORE_RETRY = isTest ? 5 : 2000

/** @type {boolean} */
let closingConnections = false

const mongoOptions = {
  useNewUrlParser: true,
  // useFindAndModify: false,
  // useCreateIndex: true,
  useUnifiedTopology: true,
}

const mongodbMemServers = {}

/**
  * Établit une connexion avec la base de données MongoDB
  *
  * @async
  * @function
  *
  * @param {number=} triesLeft - Nombre d'essais de connection
  *
  * @returns {void | import('mongodb-memory-server').MongoMemoryServer}
  */
export async function getConnection (triesLeft = 10) {
  if (closingConnections || triesLeft <= 0) {
    throw new Error('Impossible de se connecter au serveur MongoDB')
  }
  triesLeft--
  const dbUser = process.env.DB_USER
  const dbPass = process.env.DB_PASS
  const dbName = process.env.DB_NAME
  const dbHost = process.env.DB_HOST
  const dbPort = process.env.DB_PORT
  const mongoDbUri = process.env.MONGO_URL || `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`

  let mongoUri = mongoDbUri
  let mongodbMemServer
  if (isTest || isCI) {
    const MongoMemoryServer = (await import('mongodb-memory-server')).MongoMemoryServer
    mongodbMemServer = await MongoMemoryServer.create()
    mongoUri = mongodbMemServer.getUri()
    mongodbMemServers[mongoUri] = mongodbMemServer
  }

  try {
    if (process.env.NODE_ENV !== 'production') {
      console.info(`Trying to connect to MongoDB with: ${mongoUri}`)
    }
    await mongoose.connect(mongoUri, mongoOptions)
    console.info('Connected to MongoDB!')
    if (isTest) {
      return mongodbMemServer
    }
  } catch (error) {
    await mongodbMemServer?.stop()

    if (triesLeft > 0) {
      console.info(`Impossible de se connecter au serveur MongoDB : ${error.message}`)
      console.info(`Nouvel essai (encore ${triesLeft} essais)`)
      await delay(DELAY_BEFORE_RETRY)
      return getConnection(triesLeft)
    }

    console.info(`Impossible de se connecter au serveur MongoDB : ${error.message}`)
    error.message = `Out of retries, last error: ${error.message}`
    throw error
  }
}

/**
  * Ferme la(es) connexion(s)  au(x) serveur(s)
  *
  * @async
  * @function
  *
  * @param {import('mongodb-memory-server').MongoMemoryServer=} mongodbMemServer - Instance de `MongoMemoryServer` retourné par `getConnection()`
  */
export async function closeConnections (mongodbMemServer) {
  closingConnections = true
  try {
    mongoose.disconnect()
    if (!isTest) {
      return
    }

    if (mongodbMemServer) {
      return mongodbMemServer.stop()
    }

    // mongodbMemServer n'a pas été donné en argument, il s'agit donc d'un arrêt dû à une erreur non gérée
    // Il faut donc supprimer tous les `mongodbMemServers` stockés
    for (const [mongoUri, server] of Object.entries(mongodbMemServers)) {
      await server?.stop()
      delete mongodbMemServers[mongoUri]
    }
  } catch (error) {
    console.error(error)
  }
}
