require("dotenv").config();
const connectDB = require("./src/config/db");
const app = require("./src/app");
const seedAdmin = require("./src/config/adminseeder");

connectDB().then(() => {
  seedAdmin(); // <--- admin otomatis dibuat
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});
