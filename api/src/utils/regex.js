// eslint-disable-next-line no-useless-escape
export const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
// eslint-disable-next-line no-useless-escape
export const username = /^[-_@$0-9a-zA-Z]{3,}$/
//
export const strongPassword = [
  /^.{8,}$/,
  /.*[0-9]+/,
  /.*[A-Z]+/,
  /.*[a-z]+/,
  /.*\W+/,
]
