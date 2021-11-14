import dotenv from 'dotenv'

dotenv.config()

export default {
  secret: process.env.TOKEN_SECRET,
  tokenExpiration: process.env.TOKEN_EXPIRATION,
  tokenSecret: process.env.TOKEN_SECRET,

  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  dbPort: process.env.DB_PORT,
  dbHost: process.env.DB_HOST,
  mongoUrl: process.env.MONGO_URL,
}
