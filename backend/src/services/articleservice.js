const repo = require("../repository/articlerepo");

module.exports = {
  createArticle: async (data) => {
    return repo.create(data);
  },

  getAllArticles: async () => {
    return repo.findAll();
  },

  getArticleById: async (id) => {
    return repo.findById(id);
  },

  updateArticle: async (id, data) => {
    return repo.update(id, data);
  },

  deleteArticle: async (id) => {
    return repo.delete(id);
  },
};