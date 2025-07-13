const express = require('express');
const router = express.Router();

// Importa as funções do controller
const {
  getAthletes,
  getAthlete,
  addAthlete,
  updateAthlete,
  deleteAthlete
} = require('../controllers/athleteController');

// Importa os middlewares de proteção
const { protect, authorize } = require('../middleware/authMiddleware');

// Aplica o middleware 'protect' a todas as rotas abaixo
// E o middleware 'authorize' para garantir que apenas 'admin' aceda
router.use(protect);
router.use(authorize('admin'));

router.route('/')
    .get(getAthletes)
    .post(addAthlete);

router.route('/:id')
    .get(getAthlete)
    .put(updateAthlete)
    .delete(deleteAthlete);

module.exports = router;