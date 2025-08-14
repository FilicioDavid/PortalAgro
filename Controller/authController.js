// Controller/authController.js
const bcrypt = require('bcrypt');
const userModel = require('../Model/userModel');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Validação básica
        if (!username || !password) {
            return res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
        }

        // 2. Busca no "banco"
        const user = await userModel.findByUsername(username);
        if (!user) {
            return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
        }

        // 3. Comparação de senha
        // Se a senha no model estiver em texto puro (como agora), compara diretamente:
        const senhaValida = password === user.password;

        // Se já estiver usando bcrypt no futuro:
        // const senhaValida = await bcrypt.compare(password, user.password);

        if (!senhaValida) {
            return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
        }

        // 4. Sucesso — poderia gerar token JWT aqui
        return res.status(200).json({
            message: 'Login realizado com sucesso!',
            user: { id: user.id, username: user.username }
        });

    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({ message: 'Erro interno no servidor.' });
    }
};
