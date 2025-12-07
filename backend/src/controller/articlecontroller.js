const service = require("../services/articleservice");
const path = require("path");
const fs = require("fs");

module.exports = {
  // ==================== CREATE ====================
  createArticle: async (req, res) => {
    try {
      const { title, content } = req.body;
      const image = req.file ? req.file.filename : null;

      const article = await service.createArticle({ title, content, image });
      res.json({ success: true, article });
    } catch (err) {
      console.error("Error createArticle:", err);
      res.status(400).json({ success: false, message: err.message });
    }
  },

  // ==================== GET ALL ====================
  getAllArticles: async (req, res) => {
    try {
      const articles = await service.getAllArticles();
      const baseUrl = `${req.protocol}://${req.get("host")}`;

      const data = articles.map((item) => ({
        ...item._doc,
        imageUrl:
          item.image && fs.existsSync(path.join(__dirname, "../../uploads", item.image))
            ? `${baseUrl}/api/uploads/${item.image}`
            : null,
      }));

      res.json({ success: true, articles: data });
    } catch (err) {
      console.error("Error getAllArticles:", err);
      res.status(400).json({ success: false, message: err.message });
    }
  },

  // ==================== GET BY ID ====================
  getArticleById: async (req, res) => {
    try {
      const article = await service.getArticleById(req.params.id);
      if (!article)
        return res.status(404).json({ success: false, message: "Article not found" });

      const baseUrl = `${req.protocol}://${req.get("host")}`;

      res.json({
        success: true,
        article: {
          ...article._doc,
          imageUrl:
            article.image && fs.existsSync(path.join(__dirname, "../../uploads", article.image))
              ? `${baseUrl}/api/uploads/${article.image}`
              : null,
        },
      });
    } catch (err) {
      console.error("Error getArticleById:", err);
      res.status(400).json({ success: false, message: err.message });
    }
  },

  // ==================== UPDATE ====================
  updateArticle: async (req, res) => {
    try {
      const { title, content } = req.body;

      // hanya pakai file baru kalau ada
      const newImage = req.file ? req.file.filename : undefined;

      // ambil artikel lama
      const oldArticle = await service.getArticleById(req.params.id);
      if (!oldArticle)
        return res.status(404).json({ success: false, message: "Article not found" });

      // hapus file lama hanya kalau ada dan diganti file baru
      if (req.file && oldArticle.image) {
        const oldPath = path.join(__dirname, "../../uploads", oldArticle.image);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        } else {
          console.warn("File lama tidak ditemukan saat update:", oldPath);
        }
      }

      // siapkan data untuk update
      const data = { title, content };
      if (newImage) data.image = newImage;

      const article = await service.updateArticle(req.params.id, data);

      res.json({ success: true, article });
    } catch (err) {
      console.error("Error updateArticle:", err);
      res.status(400).json({ success: false, message: err.message });
    }
  },

  // ==================== DELETE ====================
  deleteArticle: async (req, res) => {
    try {
      const article = await service.deleteArticle(req.params.id);
      if (!article)
        return res.status(404).json({ success: false, message: "Article not found" });

      if (article.image) {
        const filePath = path.join(__dirname, "../../uploads", article.image);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        } else {
          console.warn("File image tidak ditemukan saat delete:", filePath);
        }
      }

      res.json({ success: true, message: "Article deleted" });
    } catch (err) {
      console.error("Error deleteArticle:", err);
      res.status(400).json({ success: false, message: err.message });
    }
  },
};
