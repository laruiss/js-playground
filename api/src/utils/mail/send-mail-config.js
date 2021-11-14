/**
 * Configuration du transporteur de courriel
 *
 * @module
 */

import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const host = process.env.SMTP_HOST || '127.0.0.1'
const port = process.env.SMTP_PORT || 1025

const user = process.env.SMTP_USER
const pass = process.env.SMTP_PASS
const service = process.env.SMTP_SERVICE

const auth = user
  ? { user, pass }
  : undefined

const nodeEnv = process.env.NODE_ENV
const isCI = process.env.CI === 'true'
const isTest = nodeEnv === 'test'
const isDev = !isTest && nodeEnv !== 'production'

const smtpSecure = !isTest && !isCI && !isDev

console.debug({ nodeEnv, isTest, isCI, isDev, smtpSecure })

/** @type {import('nodemailer').TransportOptions} */
export const transportOptions = {
  host,
  port,
  secure: smtpSecure,
  tls: {
    rejectUnauthorized: false,
  },
  service,
  ...(auth ? { auth } : undefined),
}

console.info(`Using transportOptions: ${JSON.stringify(transportOptions, null, ' ', 2).replace(pass, '***')}`)

/**
  * Renvoie les informations necessaires à l'envoi du courriel
  *
  * @function
  *
  * @returns {Promise.<import('nodemailer').Transporter>}
  *
  */
export const getMailTransporter = () => nodemailer.createTransport(transportOptions)

/**
  * Renvoie la variable d'environnement de l'adresse courriel de l'expéditeur
  *
  * @function
  *
  * @returns {string}
  *
  */
export const getMailFrom = () => process.env.EMAIL_SENDER
