import { updateUserById, getUserById } from '../users/user-queries.js'
import { sendMailValidatedEmail } from './send-mail-validated.js'

/**
 * Envoie la confirmation de la validation de l'email de
 * l'utilisateur si le hash correspond
 *
 * @async
 * @function
 *
 * @param {string} id - Id de l'utilisateur
 * @param {string} hash - Hash de validation de l'adresse courriel de l'utilisateur
 *
 * @returns {Object} - Corps de réponse
 */
export const validateEmail = async (id, hash) => {
  // Récupère l'utilisateur
  const user = await getUserById(id)

  // Si le hash donné en paramètre ne correspond pas, le lien est considéré invalide
  if (user.emailValidationHash !== hash) {
    return {
      success: false,
      message: "Votre lien n'est pas valide",
    }
  }

  // Si le hash correspond, on met à jour l'utilisateur·ice...
  const updatedUser = await updateUserById(user._id, {
    isValidatedEmail: true,
    emailValidationHash: undefined,
    emailValidatedAt: new Date(),
  })

  // ...et on lui envoie un courriel de confirmation
  const response = await sendMailValidatedEmail(user.email)
  return {
    success: true,
    response,
    message:
      'Votre adresse courriel a été validée, vous pouvez désormais accéder à l\'application',
    updatedUser,
  }
}
