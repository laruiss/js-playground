import bcrypt from 'bcrypt'

/**
 * Hache un mot de passe selon l'algorithme bcrypt
 *
 * @function
 * @async
 *
 * @param {string} password - Mot de passe à hacher
 *
 * @returns {Promise.<string>} Mot de passe haché
 */
export function getHash (password) {
  return bcrypt.hash(password, 8)
}

/**
 * Vérifie qu'un hachage selon l'algorithme bcrypt correspond à un mot de passe
 *
 * @function
 * @async
 *
 * @param {string} original - Mot de passe haché
 * @param {string} password - Mot de passe en clair
 *
 * @returns {Promise.<boolean>} `true` si le mot de passe correspond au hash, `false` sinon
 */
export const compareToHash = bcrypt.compare
