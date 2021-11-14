import jwt from 'jsonwebtoken'
import config from '../config.js'

export const options = {
  expiresIn: config.tokenExpiration,
}

const secret = config.secret

export function createToken (payload) {
  const token = jwt.sign(payload, secret, options)

  return token
}

export function checkToken (token) {
  return jwt.verify(token, secret)
}

export function validateToken (decoded, request, h) {
  if (!decoded.pseudo) {
    return { isValid: false }
  }
  request.userPseudo = decoded.pseudo
  return { isValid: true }
}
