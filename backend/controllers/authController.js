const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Função para gerar o token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // O token expira em 30 dias
  });
};

// @desc    Registrar um novo usuário
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  try {
    // Cria o usuário no banco de dados
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    // Gera o token e envia como resposta
    const token = generateToken(user._id);
    res.status(201).json({ success: true, token });

  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Fazer login de um usuário
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validação básica
  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Por favor, forneça email e senha' });
  }

  try {
    // Procura o usuário pelo email e inclui a senha na busca
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, error: 'Credenciais inválidas' });
    }

    // Compara a senha digitada com a senha do banco
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Credenciais inválidas' });
    }

    // Gera o token e envia como resposta
    const token = generateToken(user._id);
    res.status(200).json({ success: true, token });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};