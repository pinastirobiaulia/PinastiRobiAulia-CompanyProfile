const service = require("../services/authservice");

module.exports = {
  login: async (req, res) => {
    try {
      const result = await service.login(req.body);
      res.json({ success: true, ...result });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const user = await service.resetPassword(req.user.id, req.body.newPassword);
      res.json({ success: true, user });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      // Jika menggunakan JWT, logout biasanya hanya memberitahu klien untuk menghapus token
      res.json({ success: true, message: "Logged out successfully" });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
};
