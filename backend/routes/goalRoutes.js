const express = require('express');
const router = express.Router();

const {
  getAllGoals,
  getGoalsByAthlete,
  getGoalById,
  createGoal,
  updateGoal,
  deleteGoal,
  updateGoalStatus
} = require('../controllers/goalController');

const { protect, authorize } = require('../middleware/authMiddleware');

// Todas as rotas requerem autenticação
router.use(protect);

// Listar todas as metas (apenas admin)
router.get('/', authorize('admin'), getAllGoals);

// Listar metas de um atleta específico (admin ou o próprio atleta)
router.get('/athlete/:atletaId', getGoalsByAthlete);

// Buscar meta por ID (admin ou o próprio atleta)
router.get('/:id', getGoalById);

// Criar meta (apenas admin)
router.post('/', authorize('admin'), createGoal);

// Editar meta (apenas admin)
router.put('/:id', authorize('admin'), updateGoal);

// Deletar meta (apenas admin)
router.delete('/:id', authorize('admin'), deleteGoal);

// Atualizar status da meta (atleta pode marcar como concluída)
router.patch('/:id/status', authorize('atleta', 'admin'), updateGoalStatus);

module.exports = router; 