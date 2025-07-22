const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mensagem: { type: String, required: true },
  tipo: { type: String, enum: ['evento', 'meta', 'sistema', 'outro'], default: 'sistema' },
  lida: { type: Boolean, default: false },
  data: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema); 