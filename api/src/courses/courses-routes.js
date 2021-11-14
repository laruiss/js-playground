const coursesPrefix = '/courses'

/**
 * @type {import('@hapi/hapi').ServerRoute}
 */
export const getCoursesRoute = {
  method: 'GET',
  path: coursesPrefix,
  handler: function () {
    return [{
      course: 'Hello World!',
    }]
  },
}
