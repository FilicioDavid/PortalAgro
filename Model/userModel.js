// Model/userModel.js

// Exemplo de dados estáticos para testar
const users = [
    { id: 1, username: 'admin', password: 'admin123' },
];

exports.findByUsername = async (username) => {
    // Em um projeto real, você faria uma consulta no banco de dados aqui.
    // const [user] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    // return user;

    // Por enquanto, usamos a lista estática
    return users.find(user => user.username === username);
};