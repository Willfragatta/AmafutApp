const express = require('express');
const router = express.Router();

// Importa as funções do controller
const { register, login } = require('../controllers/authController');

// Define as rotas
router.post('/register', register);
router.post('/login', login);

module.exports = router;