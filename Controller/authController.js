// Controller/authController.js
const bcrypt = require('bcrypt');
const userModel = require('../Model/userModel');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
    }

    const user = userModel.getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // cria a sessão
    req.session.user = { id: user.id, username: user.username };
    return res.json({ message: 'Login bem-sucedido.' });
  } catch (err) {
    console.error('Erro no login:', err);
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    return res.json({ message: 'Logout efetuado.' });
  });
};
