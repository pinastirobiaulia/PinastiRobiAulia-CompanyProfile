// cleanDeletedImages.js
const mongoose = require("mongoose");
const Article = require("./models/article");
const fs = require("fs");
const path = require("path");

mongoose.connect("mongodb://127.0.0.1:27017/nama_database");

(async () => {
  const articles = await Article.find({});
  for (const art of articles) {
    if (art.image) {
      const filePath = path.join(__dirname, "uploads", art.image);
      if (!fs.existsSync(filePath)) {
        console.log("Hapus referensi file lama:", art.image);
        art.image = null;
        await art.save();
      }
    }
  }
  console.log("Selesai membersihkan DB");
  mongoose.disconnect();
})();
