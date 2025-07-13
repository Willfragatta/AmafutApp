const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware para proteger rotas
const protect = async (req, res, next) => {
  let token;

  // Verifica se o cabeçalho de autorização existe e começa com "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extrai o token do cabeçalho (formato: "Bearer TOKEN")
      token = req.headers.authorization.split(' ')[1];

      // Verifica e decodifica o token usando o segredo
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Procura o utilizador no banco de dados pelo ID do token e anexa ao pedido
      // O '-password' garante que a senha não seja retornada
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Continua para a próxima função de middleware/rota
    } catch (error) {
      console.error(error);
      res.status(401).json({ success: false, error: 'Não autorizado, token falhou' });
    }
  }

  if (!token) {
    res.status(401).json({ success: false, error: 'Não autorizado, sem token' });
  }
};

// Middleware para restringir o acesso a certas funções (roles)
const authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, error: `A função de utilizador '${req.user.role}' não tem autorização para aceder a esta rota` });
        }
        next();
    }
}


module.exports = { protect, authorize };