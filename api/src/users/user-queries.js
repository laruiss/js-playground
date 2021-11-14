/**
 * Gestion des utilisateurs
 *
 * @module
 */

import User from './user-model.js'
import { v4 as uuidv4 } from 'uuid'
import { compareToHash, getHash } from '../utils/crypto-utils.js'

export const INVALID_CREDENTIALS_MESSAGE = 'Identifiants invalides'

/**
  * Crée un nouvel utilisateur
  *
  * @param {import('./user-model.js').UserData} userData - Les données de l'utilisateur
  *
  * @returns {Promise.<import('./user-model.js').UserMongooseDocument>} - Document de l'utilisateur
  */
export const createUser = async (userData) => {
  const user = new User(userData)
  user.emailValidationHash = uuidv4()
  user.password = await getHash(userData.password)
  await user.save()
  return user
}

/**
  * Recherche tous les utilisateurs
  *
  *@returns  {Promise.<[import('./user-model').UserMongooseDocument]>} - Liste de documents de l'utilisateur
  */
export const findAllUsers = () => User.find({})

/**
  * Recherche un utilisateur par son ID
  *
  * @param {string} id - ID mongo de l'utilisateur
  *
  * @returns {Promise.<import('./user-model').UserMongooseDocument>} - Document de l'utilisateur
  */
export const findUserById = (id) => User.findById(id)

/**
  * Recherche un utilisateur par son ID
  *
  * @param {string[]} id - Liste d'ID mongo d'utilisateurs
  *
  * @returns {Promise.<import('./user-model').UserMongooseDocument[]>} - Document de l'utilisateur
  */
export const findUsersById = (ids) => User.find().where('_id').in(ids)

/**
  * Recherche un utilisateur par son adresse courriel
  *
  * @param {string} email - Adresse courriel de l'utilisateur
  *
  * @returns {Promise.<import('./user-model').UserMongooseDocument>} - Document de l'utilisateur
  */
export const findUserByEmail = (email) => User.findOne({ email })

/**
  * Recherche un utilisateur par son pseudo
  *
  * @param {string} username - Pseudo de l'utilisateur
  *
  * @returns {Promise.<import('./user-model').UserMongooseDocument>} - Document de l'utilisateur
  */
export const findUserByUsername = (username) => User.findOne({ username })

/**
  * Recherche plusieurs utilisateurs par leurs pseudos
  *
  * @param {string} username - Pseudo d'utilisateur
  *
  * @returns {Promise.<import('./user-model').UserMongooseDocument[]>} - Liste de document d'utilisateurs
  */
export const findUsersByUsernameMatching = async (username) => {
  const user = await User.find({
    username: {
      $regex: new RegExp(`.*${username}.*`),
    },
  })
  return user
}

/**
  * Recherche un utilisateur avec les identifiants passés en arguments
  *
  * @param {string} username - Username de l'utilisateur
  * @param {string} password - Mot de passe de l'utilisateur
  *
  * @returns {Promise.<import('./user-model').UserMongooseDocument>} - Document de l'utilisateur
  */
export const findUserByCredentials = async (username, password) => {
  const user = await User.findOne({ username })
  const error = new Error(INVALID_CREDENTIALS_MESSAGE)
  error.code = INVALID_CREDENTIALS_MESSAGE
  if (!user) {
    throw error
  }

  const isMatch = await compareToHash(password, user.password)
  if (!isMatch) {
    throw error
  }

  return user
}

/**
  * Modifie les propriétés d'un utilisateur
  *
  * @param {string} id - ID de l'utilisateur
  * @param {import('./user-model.js').UserData)} dataToUpdate - ID de l'utilisateur
  *
  * @returns {Promise.<import('./user-model').UserMongooseDocument>} - Document de l'utilisateur modifié
  */
export const updateUserById = async (id, dataToUpdate) =>
  User.findByIdAndUpdate(id, dataToUpdate, { new: true })

/**
  * Retourne un email contenant un lien avec un hash
  * @async
  * @function
  *
  * @param {string} email - L'adresse courriel de l'utilisateur
  *
  * @returns {Promise.<string>} - Hash de validation de l'email
  */
export const addEmailValidationHash = async email => {
  const emailValidationHash = uuidv4()
  const user = await findUserByEmail(email)
  user.emailValidationHash = emailValidationHash
  user.passwordResetRequestedAt = new Date()
  await user.save()
  return emailValidationHash
}

/**
  * Remplace le mot de passe existant de l'utilisateur
  *
  * @async
  * @function
  *
  * @param {User} user - Le document user de l'utilisateur à modifier
  * @param {string} password - Le nouveau mot de passe de l'utilisateur
  *
  * @returns {Promise.<User>} - Le document utilisateur modifié
  */
export const updateUserPassword = async (user, password) => {
  const now = Date.now()
  const passwordResetRequestedAt = user.passwordResetRequestedAt
  const difference = now - passwordResetRequestedAt
  const fifteenMinutes = 15 * 60 * 1000
  if (difference > fifteenMinutes) {
    const error = new Error(
      'Votre lien a expiré, veuillez refaire votre demande de réinitialisation de mot de passe',
    )
    error.status = 401
    throw error
  }
  user.password = password
  await user.save()
  return user
}
/**
  * Supprime un utilisateur à partir de son adresse courriel
  * ⚠ À n'utiliser que pour les tests ou pour init-db.js
  *
  * @param {string} email - Adresse courriel de l'utilisateur
  *
  * @returns {Promise.<import('./user-model').UserMongooseDocument>} - Document de l'utilisateur modifié
  */
export const _deleteUserByEmail = async (email) => {
  const user = await findUserByEmail(email)
  await User.findByIdAndDelete(user.id)
  return user
}

/**
  * Supprime un utilisateur
  * ⚠ À n'utiliser que pour les tests ou pour init-db.js
  *
  * @param {string} id - ID de l'utilisateur
  *
  * @returns {Promise.<import('./user-model').UserMongooseDocument>} - Document de l'utilisateur modifié
  */
export const _deleteUserById = async (id) => {
  const user = await findUserById(id)
  await User.findByIdAndDelete(user.id)
  return user
}
