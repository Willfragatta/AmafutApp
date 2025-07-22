const express = require('express');
const router = express.Router();

const {
  getAllAnalyses,
  getAnalysesByAthlete,
  getAnalysisById,
  createAnalysis,
  updateAnalysis,
  deleteAnalysis
} = require('../controllers/athleteAnalysisController');

const { protect, authorize } = require('../middleware/authMiddleware');

// Todas as rotas requerem autenticação
router.use(protect);

// Listar todas as análises (apenas admin)
router.get('/', authorize('admin'), getAllAnalyses);

// Listar análises de um atleta específico (admin ou o próprio atleta)
router.get('/athlete/:atletaId', getAnalysesByAthlete);

// Buscar análise por ID (admin ou o próprio atleta)
router.get('/:id', getAnalysisById);

// Criar análise (apenas admin)
router.post('/', authorize('admin'), createAnalysis);

// Editar análise (apenas admin)
router.put('/:id', authorize('admin'), updateAnalysis);

// Deletar análise (apenas admin)
router.delete('/:id', authorize('admin'), deleteAnalysis);

module.exports = router; 