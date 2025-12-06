const service = require("../services/projectservice");
const path = require("path");
const fs = require("fs");

module.exports = {
  createProject: async (req, res) => {
    try {
      const { title, description, link } = req.body;
      const image = req.file ? req.file.filename : null;

      const project = await service.createProject({ title, description, link, image });
      res.json({ success: true, project });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  getAllProjects: async (req, res) => {
    try {
      const projects = await service.getAllProjects();
      res.json({ success: true, projects });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  getProjectById: async (req, res) => {
    try {
      const project = await service.getProjectById(req.params.id);
      if (!project) return res.status(404).json({ success: false, message: "Project not found" });
      res.json({ success: true, project });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  updateProject: async (req, res) => {
    try {
      const { title, description, link } = req.body;
      const image = req.file ? req.file.filename : undefined;

      const data = { title, description, link };
      if (image) data.image = image;

      const project = await service.updateProject(req.params.id, data);
      if (!project) return res.status(404).json({ success: false, message: "Project not found" });

      res.json({ success: true, project });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  deleteProject: async (req, res) => {
    try {
      const project = await service.deleteProject(req.params.id);
      if (!project) return res.status(404).json({ success: false, message: "Project not found" });

      if (project.image) {
        const filePath = path.join(__dirname, "../uploads", project.image);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }

      res.json({ success: true, message: "Project deleted" });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
};