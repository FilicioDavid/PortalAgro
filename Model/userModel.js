// Model/userModel.js
const bcrypt = require('bcrypt');

// Usuários estáticos apenas para teste. Em produção, use um banco de dados.
const seedPassword = 'admin123';
const saltRounds = 10;

// Gera o hash apenas uma vez no primeiro require.
let passwordHash = bcrypt.hashSync(seedPassword, saltRounds);

const users = [
  { id: 1, username: 'admin', passwordHash }
];

/**
 * Retorna o usuário pelo username
 * @param {string} username
 * @returns {{id:number, username:string, passwordHash:string}|undefined}
 */
exports.getUserByUsername = (username) => {
  return users.find(u => u.username === username);
};
