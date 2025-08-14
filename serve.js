
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware para servir os arquivos da pasta View como arquivos estáticos
app.use(express.static(path.join(__dirname, 'View')));

// Middleware para processar requisições JSON
app.use(express.json());

// Importar as rotas (que estão em uma pasta de rotas, que você pode criar)
// const userRoutes = require('./routes/userRoutes');
// app.use('/api/users', userRoutes);

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});