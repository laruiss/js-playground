import { createUser } from './user-queries.js'
import { createUserSchema } from './user-schemas.js'
import server from '../server.js'
import { sendMailValidateEmail } from '../auth/send-mail-validate-email.js'

const usersPrefix = '/users'

/**
 * @type {import('@hapi/hapi').ServerRoute}
 */
export const getUsersRoute = {
  method: 'GET',
  path: usersPrefix,
  handler: function () {
    return [{
      name: 'Stanislas Ormières',
    }]
  },
}

/**
 * @type {import('@hapi/hapi').ServerRoute}
 */
export const createUsersRoute = {
  method: 'POST',
  path: usersPrefix,
  handler: async function (req, h) {
    const userData = req.payload

    const loggerInfo = {
      section: 'create-user-controller',
      action: 'created-User',
      description: "création d'un utilisateur",
    }

    server.log(['info'], JSON.stringify({ ...loggerInfo, userData }))
    const user = await createUser(userData)
    server.log(['info'], JSON.stringify({
      user: user.id,
      action: 'created-user',
      description:
        "Tentative d'envoi de courriel..",
    }))
    const response = await sendMailValidateEmail(user.id, user.email, user.emailValidationHash)
    server.log('info', JSON.stringify({
      ...loggerInfo,
      user: user.id,
      action: 'created-user',
      description:
        'Courriel envoyé',
    }))
    return h.response({ user, ...response, stat: 1 }).code(201)
  },
  options: {
    auth: false,
    validate: {
      payload: createUserSchema,
    },
  },
}
