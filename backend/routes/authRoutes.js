const express = require('express');
const router = express.Router();

// Importa as funções do controller
const { register, login, getPendingUsers, approveUser, rejectUser } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Define as rotas
router.post('/register', register);
router.post('/login', login);
router.get('/pending', protect, authorize('admin'), getPendingUsers);
router.put('/approve/:id', protect, authorize('admin'), approveUser);
router.put('/reject/:id', protect, authorize('admin'), rejectUser);

module.exports = router;