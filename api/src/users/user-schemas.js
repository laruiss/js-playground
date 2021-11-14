import Joi from 'joi'

export const authUserSchema = Joi.object({
  username: Joi.string().alphanum().min(2).max(30).required(),
  password: Joi.string().required(),
})

const requiredFirstnameMessage = 'Prénom obligatoire'
const requiredFirstnameError = new Error(requiredFirstnameMessage)
const requiredLastnameMessage = 'Nom obligatoire'
const requiredLastnameError = new Error(requiredLastnameMessage)
const requiredUsernameMessage = 'Pseudo obligatoire'
const requiredUsernameError = new Error(requiredUsernameMessage)
const requiredPasswordMessage = 'Mot de passe fort obligatoire'
const requiredPasswordError = new Error(requiredPasswordMessage)
const requiredEmailMessage = 'Adresse email obligatoire'
const requiredEmailError = new Error(requiredEmailMessage)
const rolesMessage = 'Rôle(s) incorrect(s)'
const rolesError = new Error(rolesMessage)

export const createUserSchema = Joi.object({
  firstname: Joi.string().min(1).max(50).required().error(requiredFirstnameError),
  lastname: Joi.string().min(1).max(50).required().error(requiredLastnameError),
  username: Joi.string().min(3).max(30).required().error(requiredUsernameError),
  password: Joi.string().min(8).max(300).required().error(requiredPasswordError),
  email: Joi.string().email().required().error(requiredEmailError),
  roles: Joi.array().items(Joi.string().valid('ADMIN', 'USER')).error(rolesError),
})
