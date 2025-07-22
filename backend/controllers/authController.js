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
      status: 'pending', // Sempre começa como pendente
    });

    // Gera o token e envia como resposta
    const token = generateToken(user._id);
    res.status(201).json({ success: true, token, user: { 
      _id: user._id, 
      name: user.name, 
      email: user.email, 
      role: user.role, 
      status: user.status 
    }});

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

    // Verifica se o usuário está aprovado
    if (user.status !== 'approved') {
      return res.status(403).json({ success: false, error: 'Conta aguardando aprovação do administrador.' });
    }

    // Compara a senha digitada com a senha do banco
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Credenciais inválidas' });
    }

    // Gera o token e envia como resposta
    const token = generateToken(user._id);
    res.status(200).json({ success: true, token, user: { 
      _id: user._id, 
      name: user.name, 
      email: user.email, 
      role: user.role, 
      status: user.status 
    }});

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Listar usuários pendentes de aprovação
// @route   GET /api/auth/pending
// @access  Private/Admin
exports.getPendingUsers = async (req, res) => {
  try {
    const users = await User.find({ status: 'pending' }).select('-password');
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Aprovar usuário
// @route   PUT /api/auth/approve/:id
// @access  Private/Admin
exports.approveUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    ).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, error: 'Usuário não encontrado' });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Rejeitar usuário
// @route   PUT /api/auth/reject/:id
// @access  Private/Admin
exports.rejectUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    ).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, error: 'Usuário não encontrado' });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};