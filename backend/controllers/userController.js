const User = require('../models/User'); // usado para buscar o usuário


exports.getMe = async (req, res) => { // usado para buscar o usuário
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, error: 'Usuário não encontrado' });
    }
    res.status(200).json({ success: true, user }); 
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.updateMe = async (req, res) => { // usado para atualizar o usuário
  try {
    
    if (req.body.password) delete req.body.password;
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true
    }).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, error: 'Usuário não encontrado' });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


exports.deleteMe = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'Usuário não encontrado' });
    }
    res.status(200).json({ success: true, message: 'Usuário excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}; 