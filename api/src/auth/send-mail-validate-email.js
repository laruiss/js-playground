import config from '../config.js'
import { sendMail } from '../utils/mail/send-mail.js'
import { getHtmlBody } from '../utils/mail/template-mail.js'

/**
 * Envoie un courriel à l'utilisateur qui vient de créer son compte avec un lien pour valider
 * son adresse courriel
 *
 * @async
 * @function
 *
 * @param {string} email - Adresse courriel du destinataire
 * @param {string} emailValidationHash - Hash de validation de l'adresse courriel de l'utilisateur
 *
 * @returns {Promise.<import('nodemailer').SentMessageInfo>} - Info d'envoi du mail
 */
export const sendMailValidateEmail = (id, email, emailValidationHash) => {
  const mailInfo = getValidateEmailMailInfo(id, email, emailValidationHash)
  try {
    return sendMail(email, mailInfo)
  } catch (error) {
    console.error(`Erreur lors de la tentative d'envoi du courriel à ${email}`)
    throw error
  }
}

/**
 * Calcule un lien de validation d'adresse courriel
 *
 * @param {string} email - Adresse courriel
 * @param {string} emailValidationHash - Hash de validation de l'adresse courriel de l'utilisateur
 *
 * @returns {string} - URL à atteindre pour valider l'adresse courriel de l'utilisateur
 */

export const computeValidateEmailLink = (_id, emailValidationHash) => {
  return `${config.publicUrl}/users/validate-email?id=${encodeURIComponent(_id)}&h=${emailValidationHash}`
}

/**
 * Retourne le contenu du corps du courriel pour une validation d'adresse courriel
 * @function
 *
 * @param {string} link - Lien de validation de l'adresse courriel
 *
 * @returns {string} - Corps du courriel
 */

export const getValidateEmailMailTemplate = (link) => `
  <p>
    Bienvenue sur JS Deep lovers.
    Pour activer votre compte, merci de cliquer sur le lien ci-dessous :
    <br>
    <a href="${link}" rel="notrack">Valider mon adresse email</a>
    <br>
    Le lien ne fonctionne pas ?
    <br>
    Copiez ce ${link} et collez-le directement dans votre navigateur préféré (mais
    FireFox est très fortement conseillé)
  </p>
`

/**
 * Construit le corps du mail à envoyer pour la validation de l'adresse courriel d'un nouvel utilisateur
 * @function
 *
 * @param {string} email - Adresse courriel du destinataire
 * @param {string} emailValidationHash - Hash de validation de l'adresse courriel de l'utilisateur
 *
 * @returns {string} - Corps du courriel
 */
export const getValidateEmailMailBody = (_id, emailValidationHash) => {
  const link = computeValidateEmailLink(_id, emailValidationHash)
  const content = getValidateEmailMailTemplate(link)
  return getHtmlBody(content)
}

/**
 * Récupère les infos du mail à envoyer pour une validation de l'adresse courriel
 *
 * @function
 *
 * @param {string} email - Adresse courriel du destinataire
 * @param {string} emailValidationHash - Hash de validation de l'adresse courriel de l'utilisateur
 *
 * @returns {MailContent}
 */
export const getValidateEmailMailInfo = (id, email, emailValidationHash) => {
  const subject = 'JS Deep lovers - Validez votre adresse courriel'
  const body = getValidateEmailMailBody(id, emailValidationHash)
  return { subject, body, to: email }
}

/**
 * @typedef MailContent
 * @type {Object}
 *
 * @property {string} subject - Sujet du courriel
 * @property {string} to - Destinataire du courriel
 * @property {string} body - Corps (en HTML) du courriel
 */
