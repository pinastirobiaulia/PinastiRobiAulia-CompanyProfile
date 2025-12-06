const repo = require("../repository/projectrepo");

module.exports = {
  createProject: async (data) => {
    return repo.create(data);
  },

  getAllProjects: async () => {
    return repo.findAll();
  },

  getProjectById: async (id) => {
    return repo.findById(id);
  },

  updateProject: async (id, data) => {
    return repo.update(id, data);
  },

  deleteProject: async (id) => {
    return repo.delete(id);
  },
};