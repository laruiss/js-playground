/**
 * Ensemble des fonctions pour envoyer les mails aux utilisateurs
 *
 * @module
 */

import { sendMail } from '../utils/mail/send-mail.js'
import { getHtmlBody } from '../utils/mail/template-mail.js'

/**
  * Envoi un email de confirmation de réinitialisation du mot de passe
  *
  * @function
  *
  * @param {string} email Adresse courriel de l'utilisateur
  */

export const sendMailConfirmationPassword = email => {
  const mail = getMailConfirmation()
  return sendMail(email, mail)
}

/**
  * Retourne le contenu du corps du mail
  * @function
  *
  * @param {string} email Adresse email du candidat
  *
  * @returns {string} Contenu HTML de la partie informative du contenu du mail de confirmation du mot de passe
  */
export const getMailConfirmationTemplate = email => `
  <p>
    Votre mot de passe a bien été réinitialisé.
  </p>
  <br>
  <p align="right">L'équipe JS Deep lover</p>
`

/**
  * Retourne le contenu HTML mail
  * @function
  *
  * @param {string} email Adresse email de l'utilisateur
  *
  * @returns Contenu HTML de tout le contenu du mail de confirmation de réinitialisation du mot de passe
  */
export const getMailConfirmationBody = email => {
  const body = getMailConfirmationTemplate(email)
  return getHtmlBody(body)
}

/**
  * Retourne le sujet et le contenu du mail
  * @function
  *
  * @param {string} email Adresse email du candidat
  *
  * @returns {MailData} Titre et corps du mail à envoyer pour la confirmation de réinitialisation du mot de passe
  */
export const getMailConfirmation = email => {
  const subject = 'Votre mot de passe a été réinitialisé'
  const body = getMailConfirmationBody(email)
  return { subject, body }
}

/**
  *
  * @typedef {Object} MailData
  * @property {string} subject - Titre de l'email
  * @property {string} content - Corps de l'email
  */
