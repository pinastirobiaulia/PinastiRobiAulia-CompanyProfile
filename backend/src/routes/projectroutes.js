const express = require("express");
const router = express.Router();
const controller = require("../controller/projectcontroller");
const upload = require("../middlewares/uploads");
const { auth } = require("../middlewares/auth"); 

// Public
router.get("/", controller.getAllProjects);
router.get("/:id", controller.getProjectById);

// Admin (Protected)
router.post("/", auth, upload.single("image"), controller.createProject);
router.put("/:id", auth, upload.single("image"), controller.updateProject);
router.delete("/:id", auth, controller.deleteProject);

module.exports = router;
