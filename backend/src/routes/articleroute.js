const express = require("express");
const router = express.Router();
const controller = require("../controller/articlecontroller");
const upload = require("../middlewares/uploads");
const { auth } = require("../middlewares/auth"); 

router.get("/", controller.getAllArticles);
router.get("/:id", controller.getArticleById);

router.post("/", auth, upload.single("image"), controller.createArticle);
router.put("/:id", auth, upload.single("image"), controller.updateArticle);
router.delete("/:id", auth, controller.deleteArticle);

module.exports = router;
