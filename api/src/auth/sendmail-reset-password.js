/**
 * Fonctions pour gérer la réinitialisation de mot de passe
 *
 * @module
 */

import { sendMail } from '../utils/mail/send-mail.js'
import { getHtmlBody } from '../utils/mail/template-mail.js'
import config from '../config.js'
import { addEmailValidationHash } from '../users/user-queries.js'

/**
  * Envoie un email contenant le lien de réinitialisation
  *
  * @async
  * @function
  *
  * @param {string} email - Adresse courriel de l'utilisateur
  */
export const sendMailResetLink = async email => {
  const urlResetLink = await getUrlResetLink(email)
  const mail = await getResetLinkMail(urlResetLink)
  return sendMail(email, mail)
}

/**
  * Génère le contenu du mail
  *
  * @function
  *
  * @param {string} urlResetLink - Lien à envoyer dans le mail avec l'adresse courriel et le hash de réinitialisation
  *
  * @returns {string} - Contenu HTML de la partie informative du contenu du mail de réinitialisation du mot de passe
  */
export const getResetLinkTemplate = urlResetLink => `
   <p>
     Vous avez demandé à réinitialiser votre mot de passe. Vous pouvez dès à présent
     réinitialiser votre mot de passe en cliquant sur le lien suivant :
     <a href="${urlResetLink}" rel="notrack">Réinitialiser le mot de passe</a>
   </p>
   <br>
   <p align="right">L'équipe JS Deep lover</p>
 `

/**
  * Renvoie le contenu du mail
  *
  * @function
  *
  * @param {string} urlResetLink - Lien à envoyer dans le mail avec l'adresse courriel et le hash de réinitialisation
  *
  * @returns {string} - Contenu HTML de tout le contenu du mail de réinitialisation du mot de passe
  */
export const getResetLinkMailBody = urlResetLink => {
  const content = getResetLinkTemplate(urlResetLink)
  return getHtmlBody(content)
}

/**
  * Renvoie le sujet et le contenu du mail
  *
  * @function
  *
  * @param {string} urlResetLink - Lien à envoyer dans le mail avec l'adresse courriel et le hash de réinitialisation
  *
  * @returns {MailData} - Titre et corps du mail à envoyer pour la réinitialisation du mot de passe
  */
export const getResetLinkMail = urlResetLink => {
  const subject = 'Réinitialisation de votre mot de passe'
  const body = getResetLinkMailBody(urlResetLink)
  return { subject, body }
}

/**
  * Renvoie le lien de réinitialisation contenant le hash
  *
  * @async
  * @function
  *
  * @param {string} email - Adresse courriel de l'utilisateur
  *
  * @returns {Promise.<string>}
  */

export const getUrlResetLink = async email => {
  const emailValidationHash = await addEmailValidationHash(email)
  return `${config.publicUrl}/users/reset-link?email=${encodeURIComponent(
    email,
  )}&hash=${encodeURIComponent(emailValidationHash)}`
}

/**
  *
  * @typedef {Object} MailData
  * @property {string} subject - Titre de l'email
  * @property {string} content - Corps de l'email
  */
