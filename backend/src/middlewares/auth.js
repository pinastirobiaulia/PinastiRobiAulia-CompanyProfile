const jwt = require("../utils/jwt");

module.exports = {
  auth: (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: "Unauthorized" });

    const token = header.split(" ")[1];
    try {
      req.user = jwt.verify(token);
      next();
    } catch {
      res.status(401).json({ message: "Invalid token" });
    }
  },

  adminOnly: (req, res, next) => {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Admin only" });

    next();
  }
};
