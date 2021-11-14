import config from '../config.js'
import { validateToken } from '../utils/token-utils.js'

export default {
  key: config.secret,
  validate: validateToken,
}
