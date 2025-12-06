const User = require("../models/usermodels");
const bcrypt = require("bcrypt");
const validatePassword = require("../utils/passwordValidator");

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" });

    if (adminExists) {
      console.log("Admin already exists");
      return;
    }

    const password = "Admin@123456789"; // password default

    if (!validatePassword(password)) {
      console.log("Default admin password does NOT meet rules");
      return;
    }

    const hashed = await bcrypt.hash(password, 12);

    await User.create({
      username: "admin",
      password: hashed,
      role: "admin"
    });

    console.log("Default admin created:");
    console.log("username: admin");
    console.log("password:", password);

  } catch (err) {
    console.error("Admin seeder error:", err.message);
  }
};

module.exports = seedAdmin;
