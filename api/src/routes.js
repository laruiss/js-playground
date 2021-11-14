import * as usersRoutes from './users/users-routes.js'
import * as coursesRoutes from './courses/courses-routes.js'

export default [
  ...Object.values({
    ...usersRoutes,
    ...coursesRoutes,
  }),
]
