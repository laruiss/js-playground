import { sendMail } from '../utils/mail/send-mail.js'
import { getHtmlBody } from '../utils/mail/template-mail.js'

/**
 * @function
 *
 * @param {string} email - Adresse courriel du destinataire
 *
 * @returns {Promise.<import('nodemailer').SentMessageInfo>} - Info d'envoi du mail
 */
export const sendMailValidatedEmail = (email) => {
  const mailInfo = getVerifyEmailInfo(email)
  return sendMail(email, mailInfo)
}

/**
 * Retourne le contenu du corps du courriel pour une validation d'adresse courriel
 * @function
 *
 * @param {string} link - Lien de validation de l'adresse courriel
 *
 * @returns {string} - Corps du courriel
 */

export const getMailEmailValidatedContent = (email) => `<p> Votre adresse courriel ${email} est validée. </p>`

/**
 * @function
 *
 * @param {string} email - Adresse courriel du destinataire
 *
 * @returns {string} - Corps du courriel
 */
export const getMailValidMailBody = (email) => {
  const content = getMailEmailValidatedContent(email)
  return getHtmlBody(content)
}

/**
 * Récupère les infos du mail à envoyer pour une validation de l'adresse courriel
 *
 * @function
 *
 * @param {string} email - Adresse courriel du destinataire
 *
 * @returns {MailContent}
 */
export const getVerifyEmailInfo = (email) => {
  const subject = 'JS Deep lover - Votre adresse courriel est validée'
  const body = getMailValidMailBody(email)
  return { subject, body, to: email }
}

/**
 * @typedef MailContent
 * @type {Object}
 *
 * @property {string} subject - Sujet du courriel
 * @property {string} body - Corps (en HTML) du courriel
 * @property {string} email - Email de l'utilisateur·ice
 */
