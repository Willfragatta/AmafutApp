const Notification = require('../models/Notification');
const User = require('../models/User');

// Listar todas as notificações (apenas admin)
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .populate('usuario', 'name');
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Listar notificações de um usuário (admin ou o próprio usuário)
exports.getNotificationsByUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.userId) {
      return res.status(403).json({ success: false, error: 'Acesso negado' });
    }
    const notifications = await Notification.find({ usuario: req.params.userId });
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Buscar notificação por ID (admin ou o próprio usuário)
exports.getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id)
      .populate('usuario', 'name');
    if (!notification) {
      return res.status(404).json({ success: false, error: 'Notificação não encontrada' });
    }
    if (req.user.role !== 'admin' && req.user._id.toString() !== notification.usuario._id.toString()) {
      return res.status(403).json({ success: false, error: 'Acesso negado' });
    }
    res.status(200).json({ success: true, notification });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Criar notificação (admin ou sistema)
exports.createNotification = async (req, res) => {
  try {
    const notification = await Notification.create(req.body);
    res.status(201).json({ success: true, notification });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Marcar notificação como lida (apenas o próprio usuário)
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ success: false, error: 'Notificação não encontrada' });
    }
    if (req.user.role !== 'admin' && req.user._id.toString() !== notification.usuario.toString()) {
      return res.status(403).json({ success: false, error: 'Acesso negado' });
    }
    notification.lida = true;
    await notification.save();
    res.status(200).json({ success: true, notification });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Deletar notificação (apenas admin)
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).json({ success: false, error: 'Notificação não encontrada' });
    }
    res.status(200).json({ success: true, message: 'Notificação excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}; 