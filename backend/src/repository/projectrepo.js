const Project = require("../models/projects");

module.exports = {
  create: async (data) => {
    const project = new Project(data);
    return project.save();
  },

  findAll: async () => {
    return Project.find().sort({ createdAt: -1 });
  },

  findById: async (id) => {
    return Project.findById(id);
  },

  update: async (id, data) => {
    return Project.findByIdAndUpdate(id, { ...data, updatedAt: Date.now() }, { new: true });
  },

  delete: async (id) => {
    return Project.findByIdAndDelete(id);
  },
};