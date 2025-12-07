const service = require("../services/userservice");

module.exports = {
  createUser: async (req, res) => {
    try {
      const user = await service.createUser(req.body);
      res.json({ success: true, user }); 
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await service.getAllUsers();
      res.json({ success: true, users });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await service.getUserById(req.params.id);
      if (!user) return res.status(404).json({ success: false, message: "User not found" });
      res.json({ success: true, user });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const user = await service.updateUser(req.params.id, req.body);
      if (!user) return res.status(404).json({ success: false, message: "User not found" });
      res.json({ success: true, user });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const result = await service.deleteUser(req.params.id);
      if (!result) return res.status(404).json({ success: false, message: "User not found" });
      res.json({ success: true, message: "User deleted" });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
};
