const Goal = require('../models/Goal');
const User = require('../models/User');

// Listar todas as metas (apenas admin)
exports.getAllGoals = async (req, res) => {
  try {
    const goals = await Goal.find()
      .populate('atleta', 'name')
      .populate('criadoPor', 'name');
    res.status(200).json({ success: true, goals });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Listar metas de um atleta específico (admin ou o próprio atleta)
exports.getGoalsByAthlete = async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.atletaId) {
      return res.status(403).json({ success: false, error: 'Acesso negado' });
    }
    const goals = await Goal.find({ atleta: req.params.atletaId })
      .populate('criadoPor', 'name');
    res.status(200).json({ success: true, goals });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Buscar meta por ID
exports.getGoalById = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id)
      .populate('atleta', 'name')
      .populate('criadoPor', 'name');
    if (!goal) {
      return res.status(404).json({ success: false, error: 'Meta não encontrada' });
    }
    if (req.user.role !== 'admin' && req.user._id.toString() !== goal.atleta._id.toString()) {
      return res.status(403).json({ success: false, error: 'Acesso negado' });
    }
    res.status(200).json({ success: true, goal });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Criar nova meta (apenas admin)
exports.createGoal = async (req, res) => {
  try {
    const goal = await Goal.create({ ...req.body, criadoPor: req.user._id });
    res.status(201).json({ success: true, goal });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Editar meta (apenas admin)
exports.updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!goal) {
      return res.status(404).json({ success: false, error: 'Meta não encontrada' });
    }
    res.status(200).json({ success: true, goal });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Deletar meta (apenas admin)
exports.deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.id);
    if (!goal) {
      return res.status(404).json({ success: false, error: 'Meta não encontrada' });
    }
    res.status(200).json({ success: true, message: 'Meta excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Atualizar status da meta (atleta pode marcar como concluída)
exports.updateGoalStatus = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ success: false, error: 'Meta não encontrada' });
    }
    // Só o próprio atleta pode atualizar o status
    if (req.user.role !== 'admin' && req.user._id.toString() !== goal.atleta.toString()) {
      return res.status(403).json({ success: false, error: 'Acesso negado' });
    }
    goal.status = req.body.status;
    await goal.save();
    res.status(200).json({ success: true, goal });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}; 