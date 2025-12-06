const User = require("../models/usermodels");

module.exports = {
  create: (data) => User.create(data),
  findByUsername: (username) => User.findOne({ username }),
  findById: (id) => User.findById(id),
  getAll: () => User.find(),
  update: (id, data) => User.findByIdAndUpdate(id, data, { new: true }),
  delete: (id) => User.findByIdAndDelete(id)
};
