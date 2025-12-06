const service = require("../services/articleservice");
const path = require("path");
const fs = require("fs");

module.exports = {
  createArticle: async (req, res) => {
    try {
      const { title, content } = req.body;
      const image = req.file ? req.file.filename : null;

      const article = await service.createArticle({ title, content, image });
      res.json({ success: true, article });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  getAllArticles: async (req, res) => {
    try {
      const articles = await service.getAllArticles();
      res.json({ success: true, articles });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  getArticleById: async (req, res) => {
    try {
      const article = await service.getArticleById(req.params.id);
      if (!article) return res.status(404).json({ success: false, message: "Article not found" });
      res.json({ success: true, article });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  updateArticle: async (req, res) => {
    try {
      const { title, content } = req.body;
      const image = req.file ? req.file.filename : undefined;

      const data = { title, content };
      if (image) data.image = image;

      const article = await service.updateArticle(req.params.id, data);
      if (!article) return res.status(404).json({ success: false, message: "Article not found" });

      res.json({ success: true, article });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  deleteArticle: async (req, res) => {
    try {
      const article = await service.deleteArticle(req.params.id);
      if (!article) return res.status(404).json({ success: false, message: "Article not found" });

      if (article.image) {
        const filePath = path.join(__dirname, "../uploads", article.image);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }

      res.json({ success: true, message: "Article deleted" });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
};