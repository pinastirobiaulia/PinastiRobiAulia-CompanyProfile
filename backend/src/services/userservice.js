const bcrypt = require("bcrypt");
const validatePassword = require("../utils/passwordValidator");
const repo = require("../repository/userrepo");

module.exports = {
  createUser: async (data) => {
    const existingUser = await repo.findByUsername(data.username);
    if (existingUser) {
      throw new Error("Username already exists");
    }

    const check = validatePassword(data.password);
    if (!check.valid) {
      throw new Error("Password tidak memenuhi syarat: " + check.errors.join(", "));
    }

    data.password = await bcrypt.hash(data.password, 12);

    return repo.create(data);
  },

  getAllUsers: () => repo.getAll(),

    getUserById: (id) => repo.findById(id),

  updateUser: async (id, data) => {
    if (data.password) {
      const check = validatePassword(data.password);
      if (!check.valid) throw new Error("Password tidak memenuhi syarat: " + check.errors.join(", "));
      data.password = await bcrypt.hash(data.password, 12);
    }
    return repo.update(id, data);
  },

  deleteUser: (id) => repo.delete(id)
  
};