const express = require("express");
const cors = require("cors"); // <--- import cors
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"], // frontend yang diizinkan
  credentials: true,
}));

app.use("/api/uploads", express.static(path.join(__dirname, "../uploads")));

// routes
app.use("/api/auth", require("./routes/authroute"));
app.use("/api/users", require("./routes/userroute"));
app.use("/api/articles", require("./routes/articleroute")); 
app.use("/api/projects", require("./routes/projectroutes")); 

module.exports = app;