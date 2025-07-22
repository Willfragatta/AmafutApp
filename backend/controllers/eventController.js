const Event = require('../models/Event');
const User = require('../models/User');

// Listar todos os eventos (admin e atletas)
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('atletas_convocados', 'name').populate('criadoPor', 'name');
    res.status(200).json({ success: true, events });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Buscar evento por ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('atletas_convocados', 'name')
      .populate('criadoPor', 'name')
      .populate('confirmações.atleta', 'name');
    if (!event) {
      return res.status(404).json({ success: false, error: 'Evento não encontrado' });
    }
    res.status(200).json({ success: true, event });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Criar novo evento (apenas admin)
exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create({ ...req.body, criadoPor: req.user._id });
    res.status(201).json({ success: true, event });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Editar evento (apenas admin)
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) {
      return res.status(404).json({ success: false, error: 'Evento não encontrado' });
    }
    res.status(200).json({ success: true, event });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Deletar evento (apenas admin)
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, error: 'Evento não encontrado' });
    }
    res.status(200).json({ success: true, message: 'Evento excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Confirmar presença ou ausência (atleta)
exports.confirmPresence = async (req, res) => {
  try {
    const { status, motivo } = req.body; // status: 'confirmado' ou 'nao_posso'
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, error: 'Evento não encontrado' });
    }
    // Só atletas convocados podem confirmar
    if (!event.atletas_convocados.includes(req.user._id)) {
      return res.status(403).json({ success: false, error: 'Você não foi convocado para este evento.' });
    }
    // Atualiza ou adiciona confirmação
    const idx = event.confirmações.findIndex(c => c.atleta.toString() === req.user._id.toString());
    if (idx > -1) {
      event.confirmações[idx].status = status;
      event.confirmações[idx].motivo = motivo;
      event.confirmações[idx].dataResposta = new Date();
    } else {
      event.confirmações.push({ atleta: req.user._id, status, motivo, dataResposta: new Date() });
    }
    await event.save();
    res.status(200).json({ success: true, event });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Verificar confirmações (admin)
exports.getConfirmations = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('confirmações.atleta', 'name');
    if (!event) {
      return res.status(404).json({ success: false, error: 'Evento não encontrado' });
    }
    res.status(200).json({ success: true, confirmações: event.confirmações });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}; 