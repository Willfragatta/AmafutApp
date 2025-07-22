const mongoose = require('mongoose');

const dadosFisicosSchema = new mongoose.Schema({
  altura: Number,
  peso: Number,
  imc: Number,
  percentual_gordura: Number,
  sprint_10m: Number,
  sprint_30m: Number,
  salto_vertical: [Number], // 3 valores
  yoyo_1800m: [{ minutos: Number, segundos: Number }], // 2 valores
  lesao: { type: String, enum: ['sim', 'nao'] },
  data_retorno: Date
}, { _id: false });

const analiseTaticaSchema = new mongoose.Schema({
  leitura_jogo: Number,
  tomada_decisao: Number,
  qualidade_passe: Number,
  controle_bola: Number,
  visao_jogo: Number,
  posicionamento_ofensivo: Number,
  posicionamento_defensivo: Number,
  marcacao: Number,
  um_contra_um_ofensivo: Number,
  um_contra_um_defensivo: Number,
  reacao_perda_bola: Number,
  comunicacao: Number,
  lideranca: Number,
  intensidade_garra: Number,
  adaptacao_tatica: Number,
  forca_mental: Number
}, { _id: false });

const athleteAnalysisSchema = new mongoose.Schema({
  atleta: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  data_analise: { type: Date, required: true },
  dados_fisicos: dadosFisicosSchema,
  analise_tatica: analiseTaticaSchema,
  evento: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  criadoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('AthleteAnalysis', athleteAnalysisSchema); 