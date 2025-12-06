const Article = require("../models/article");

module.exports = {
  create: async (data) => {
    const article = new Article(data);
    return article.save();
  },

  findAll: async () => {
    return Article.find().sort({ createdAt: -1 });
  },

  findById: async (id) => {
    return Article.findById(id);
  },

  update: async (id, data) => {
    return Article.findByIdAndUpdate(id, { ...data, updatedAt: Date.now() }, { new: true });
  },

  delete: async (id) => {
    return Article.findByIdAndDelete(id);
  },
};