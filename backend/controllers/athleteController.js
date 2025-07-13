const User = require('../models/User');

// @desc    Obter todos os atletas
// @route   GET /api/athletes
// @access  Private/Admin
exports.getAthletes = async (req, res, next) => {
  try {
    // Encontra todos os utilizadores com a função 'atleta'
    const athletes = await User.find({ role: 'atleta' });

    res.status(200).json({
      success: true,
      count: athletes.length,
      data: athletes,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro de servidor' });
  }
};

// @desc    Obter um único atleta
// @route   GET /api/athletes/:id
// @access  Private/Admin
exports.getAthlete = async (req, res, next) => {
  try {
    const athlete = await User.findById(req.params.id);

    if (!athlete || athlete.role !== 'atleta') {
      return res.status(404).json({ success: false, error: 'Atleta não encontrado' });
    }

    res.status(200).json({ success: true, data: athlete });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro de servidor' });
  }
};

// @desc    Adicionar um novo atleta (pode ser feito pelo registo também)
// @route   POST /api/athletes
// @access  Private/Admin
exports.addAthlete = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const athlete = await User.create({
            name,
            email,
            password,
            role: 'atleta' // Garante que a função seja 'atleta'
        });
        res.status(201).json({ success: true, data: athlete });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Atualizar um atleta
// @route   PUT /api/athletes/:id
// @access  Private/Admin
exports.updateAthlete = async (req, res, next) => {
    try {
        const athlete = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Retorna o documento modificado
            runValidators: true // Roda os validadores do schema
        });

        if (!athlete) {
            return res.status(404).json({ success: false, error: 'Atleta não encontrado' });
        }
        res.status(200).json({ success: true, data: athlete });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Eliminar um atleta
// @route   DELETE /api/athletes/:id
// @access  Private/Admin
exports.deleteAthlete = async (req, res, next) => {
    try {
        const athlete = await User.findByIdAndDelete(req.params.id);

        if (!athlete) {
            return res.status(404).json({ success: false, error: 'Atleta não encontrado' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Erro de servidor' });
    }
};