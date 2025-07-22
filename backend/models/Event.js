const mongoose = require('mongoose');

const confirmationSchema = new mongoose.Schema({
  atleta: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['confirmado', 'nao_posso', 'pendente'], default: 'pendente' },
  motivo: { type: String },
  dataResposta: { type: Date }
}, { _id: false });

const eventSchema = new mongoose.Schema({
  modalidade: { type: String, enum: ['treino', 'amistoso', 'campeonato'], required: true },
  data: { type: Date, required: true },
  horario: { type: String, required: true },
  local: { type: String, required: true, maxlength: 20 },
  contra: { type: String, maxlength: 20 },
  nome_competicao: { type: String, maxlength: 20 },
  fase: { type: String, enum: ['Fase de grupos', 'Oitavas de final', 'Quartas de final', 'Semi final', 'Final'] },
  atletas_convocados: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  observacoes: { type: String, maxlength: 300 },
  confirmações: [confirmationSchema],
  criadoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['ativo', 'cancelado'], default: 'ativo' }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema); 