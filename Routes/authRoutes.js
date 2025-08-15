// Routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../Controller/authController');

router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;
