const express = require('express');
const router = express.Router();

const {
  getAllNotifications,
  getNotificationsByUser,
  getNotificationById,
  createNotification,
  markAsRead,
  deleteNotification
} = require('../controllers/notificationController');

const { protect, authorize } = require('../middleware/authMiddleware');

// Todas as rotas requerem autenticação
router.use(protect);

// Listar todas as notificações (apenas admin)
router.get('/', authorize('admin'), getAllNotifications);

// Listar notificações de um usuário (admin ou o próprio usuário)
router.get('/user/:userId', getNotificationsByUser);

// Buscar notificação por ID (admin ou o próprio usuário)
router.get('/:id', getNotificationById);

// Criar notificação (admin ou sistema)
router.post('/', authorize('admin'), createNotification);

// Marcar notificação como lida (apenas o próprio usuário)
router.patch('/:id/read', markAsRead);

// Deletar notificação (apenas admin)
router.delete('/:id', authorize('admin'), deleteNotification);

module.exports = router; 