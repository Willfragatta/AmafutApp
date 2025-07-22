const AthleteAnalysis = require('../models/AthleteAnalysis');
const User = require('../models/User');

// Listar todas as análises (apenas admin)
exports.getAllAnalyses = async (req, res) => {
  try {
    const analyses = await AthleteAnalysis.find()
      .populate('atleta', 'name')
      .populate('evento', 'modalidade data')
      .populate('criadoPor', 'name');
    res.status(200).json({ success: true, analyses });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Listar análises de um atleta específico (admin ou o próprio atleta)
exports.getAnalysesByAthlete = async (req, res) => {
  try {
    // Se não for admin, só pode ver as próprias análises
    if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.atletaId) {
      return res.status(403).json({ success: false, error: 'Acesso negado' });
    }
    const analyses = await AthleteAnalysis.find({ atleta: req.params.atletaId })
      .populate('evento', 'modalidade data')
      .populate('criadoPor', 'name');
    res.status(200).json({ success: true, analyses });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Buscar análise por ID
exports.getAnalysisById = async (req, res) => {
  try {
    const analysis = await AthleteAnalysis.findById(req.params.id)
      .populate('atleta', 'name')
      .populate('evento', 'modalidade data')
      .populate('criadoPor', 'name');
    if (!analysis) {
      return res.status(404).json({ success: false, error: 'Análise não encontrada' });
    }
    // Se não for admin, só pode ver se for o próprio atleta
    if (req.user.role !== 'admin' && req.user._id.toString() !== analysis.atleta._id.toString()) {
      return res.status(403).json({ success: false, error: 'Acesso negado' });
    }
    res.status(200).json({ success: true, analysis });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Criar nova análise (apenas admin)
exports.createAnalysis = async (req, res) => {
  try {
    const analysis = await AthleteAnalysis.create({ ...req.body, criadoPor: req.user._id });
    res.status(201).json({ success: true, analysis });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Editar análise (apenas admin)
exports.updateAnalysis = async (req, res) => {
  try {
    const analysis = await AthleteAnalysis.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!analysis) {
      return res.status(404).json({ success: false, error: 'Análise não encontrada' });
    }
    res.status(200).json({ success: true, analysis });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Deletar análise (apenas admin)
exports.deleteAnalysis = async (req, res) => {
  try {
    const analysis = await AthleteAnalysis.findByIdAndDelete(req.params.id);
    if (!analysis) {
      return res.status(404).json({ success: false, error: 'Análise não encontrada' });
    }
    res.status(200).json({ success: true, message: 'Análise excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}; 