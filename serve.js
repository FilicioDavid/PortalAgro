// serve.js
const path = require('path');
const express = require('express');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 } // 1h
}));

// Rotas de API
const authRoutes = require('./Routes/authRoutes');
app.use('/api/auth', authRoutes);

// Middleware de proteção
function ensureAuth(req, res, next) {
  if (req.session && req.session.user) return next();
  return res.status(401).sendFile(path.join(__dirname, 'View', 'login.html'));
}

// Rota específica protegida para home.html (PRECISA vir antes do static)
app.get('/home.html', ensureAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'View', 'home.html'));
});

// Arquivos estáticos (login.html, css, js, imagens, etc.)
app.use(express.static(path.join(__dirname, 'View')));

// Fallback: redireciona raiz para login
app.get('/', (req, res) => {
  res.redirect('/login.html');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
