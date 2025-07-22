const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Importa o bcrypt

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor, adicione um nome'],
    },
    email: {
      type: String,
      required: [true, 'Por favor, adicione um email'],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Por favor, adicione um email válido',
      ],
    },
    password: {
      type: String,
      required: [true, 'Por favor, adicione uma senha'],
      minlength: 6,
      select: false, // Não retorna a senha nas queries por padrão
    },
    role: {
      type: String,
      enum: ['atleta', 'admin'],
      default: 'atleta',
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Middleware (hook) que é executado ANTES de salvar o usuário no banco
userSchema.pre('save', async function (next) {
  // Se a senha não foi modificada, pula para o próximo middleware
  if (!this.isModified('password')) {
    next();
  }

  // Gera o "salt" para a criptografia
  const salt = await bcrypt.genSalt(10);
  // Criptografa a senha
  this.password = await bcrypt.hash(this.password, salt);
});

// Método para comparar a senha digitada com a senha criptografada no banco
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);