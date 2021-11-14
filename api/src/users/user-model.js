/**
 * Module de définition du Schéma et du modèle de User
 *
 * @module
 */

import mongoose from 'mongoose'
import beautifyUnique from 'mongoose-beautiful-unique-validation'

import
{
  compareToHash,
  getHash,
} from '../utils/crypto-utils.js'

import {
  username as regexPseudo,
  email as regexEmail,
  strongPassword,
} from '../utils/regex.js'

import {
  EXISTING_EMAIL_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  MISSING_FIRSTNAME_MESSAGE,
  MISSING_LASTNAME_MESSAGE,
  MISSING_EMAIL_MESSAGE,
  MISSING_PASSWORD_MESSAGE,
  EXISTING_USERNAME_MESSAGE,
  MISSING_USERNAME_MESSAGE,
  INVALID_USERNAME_MESSAGE,
  WEAK_PASSWORD,
} from '../messages.js'

const { Schema } = mongoose

/**
  * @constructor UserSchema
  */

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, MISSING_FIRSTNAME_MESSAGE],
      trim: true,
    },

    lastname: {
      type: String,
      required: [true, MISSING_LASTNAME_MESSAGE],
      trim: true,
    },

    email: {
      type: String,
      match: [regexEmail, INVALID_EMAIL_MESSAGE],
      required: [true, MISSING_EMAIL_MESSAGE],
      lowercase: true,
      trim: true,
      unique: EXISTING_EMAIL_MESSAGE,
    },

    roles: {
      type: [String],
      enum: ['USER', 'ADMIN'],
      default: [],
    },

    username: {
      type: String,
      match: [regexPseudo, INVALID_USERNAME_MESSAGE],
      required: [true, MISSING_USERNAME_MESSAGE],
      trim: true,
      unique: EXISTING_USERNAME_MESSAGE,
    },

    password: {
      type: String,
      required: [true, MISSING_PASSWORD_MESSAGE],
      trim: true,
    },

    emailValidationHash: {
      type: String,
      required: false,
    },

    isValidatedEmail: {
      type: Boolean,
      default: false,
    },

    emailValidatedAt: {
      type: Date,
      default: undefined,
    },

    passwordResetRequestedAt: {
      type: Date,
      default: undefined,
    },
  },
  { timestamps: true },
)

UserSchema.plugin(beautifyUnique)

UserSchema.set('toJSON', {
  transform (doc, ret /*, opt */) {
    delete ret.password
    delete ret.emailValidationHash
    delete ret.__v
    return ret
  },
})

UserSchema.pre('save', async function preSave () {
  const user = this

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return

  const isPasswordStrong = strongPassword.every((regex) =>
    regex.test(user.password),
  )

  if (!isPasswordStrong) {
    throw new Error(WEAK_PASSWORD)
  }

  // Generate a hash
  user.password = getHash(user.password)
})

UserSchema.methods.comparePassword = function comparePassword (password) {
  return compareToHash(password, this.password)
}

export default mongoose.model('User', UserSchema)

/**
  * @typedef UserMongooseDocument
  * @type {UserData & import('mongoose').Document}
  */

/**
  * @typedef UserData
  * @type {Object}
  *
  * @property {Date} createdAt - Date de création du document dans la bdd
  * @property {Date} updatedAt - Date de dernière modification dans la bdd
  * @property {string} firstname - Prénom de l'utilisateur
  * @property {string} lastname - Nom d'usage de l'utilisateur
  * @property {string} username - Pseudo de l'utilisateur
  * @property {string} password - Mot de passe de l'utilisateur
  * @property {string} email - Adresse courriel de l'utilisateur
  * @property {'USER'| 'ADMIN'} roles - Utilisateur ou Admin
  * @property {string} emailValidationHash - Hash de validation de l'email de l'utilisateur
  * @property {string} emailValidatedAt - Date de validation du courrier de l'utilisateur
  * @property {string} isValidatedEmail - Valeur à (false) si l'email n'est pas valide
  */
