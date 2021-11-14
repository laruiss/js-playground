import authUserSchema from '../validations/auth-user-schema.js'

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
  handler: function () {
    return [{
      name: 'Stanislas Ormières',
    }]
  },
  options: {
    validate: {
      payload: authUserSchema,
    },
  },
}
