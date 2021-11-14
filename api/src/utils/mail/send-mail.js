import { getMailTransporter, getMailFrom } from './send-mail-config.js'

/**
 * Retourne les informations de l'utilisateur, le sujet et le corps du courriel
 *
 * @function
 *
 * @param {string} to - Renvoi l'adresse courriel du destinateur
 * @param {string} subject - Sujet du courriel envoyer à l'utilisateur
 * @param {string} html - Contenu du courriel
 *
 * @returns {Promise.<import('nodemailer').SendMailOptions} - Les informations pour l'envoi du courriel
 */

export const getMailInfo = (to, subject, html) => ({
  from: getMailFrom(),
  to,
  subject,
  html,
})

/**
 *
 * @param {string} to - Destinataire du courriel
 * @param {string} subject - Sujet du courriel
 * @param {string} html - Contenu du courriel
 *
 * @returns {Promise.<import('nodemailer').SentMessageInfo} - Les informations de l'envoi du courriel
 *
 */

export const sendMail = async (to, { subject, body: html }) => {
  const transporter = getMailTransporter()

  // ETAPE 2
  const mailInfo = getMailInfo(to, subject, html)

  const info = await transporter.sendMail(mailInfo)
  console.info({
    action: 'Email-sent',
  })
  console.info('Email sent')
  return info
}
