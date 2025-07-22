const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  atleta: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tipo: { type: String, enum: ['fisica', 'tecnica', 'tatica', 'mental'], required: true },
  descricao: { type: String, maxlength: 100, required: true },
  prazo: { type: String, maxlength: 15 },
  acoes: { type: String, maxlength: 100 },
  status: { type: String, enum: ['em_progresso', 'concluida'], default: 'em_progresso' },
  criadoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema); 