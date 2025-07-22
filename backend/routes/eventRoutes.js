const express = require('express');
const router = express.Router();

const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  confirmPresence,
  getConfirmations
} = require('../controllers/eventController');

const { protect, authorize } = require('../middleware/authMiddleware');

// Todas as rotas requerem autenticação
router.use(protect);

// Listar todos os eventos (admin e atletas)
router.get('/', getEvents);

// Buscar evento por ID
router.get('/:id', getEventById);

// Criar evento (apenas admin)
router.post('/', authorize('admin'), createEvent);

// Editar evento (apenas admin)
router.put('/:id', authorize('admin'), updateEvent);

// Deletar evento (apenas admin)
router.delete('/:id', authorize('admin'), deleteEvent);

// Confirmar presença ou ausência (atleta)
router.post('/:id/confirm', authorize('atleta', 'admin'), confirmPresence);

// Verificar confirmações (apenas admin)
router.get('/:id/confirmations', authorize('admin'), getConfirmations);

module.exports = router; 