const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");
const repo = require("../repository/userrepo");
const validatePassword = require("../utils/passwordValidator");

module.exports = {
  login: async ({ username, password }) => {
    const user = await repo.findByUsername(username);
    if (!user) throw new Error("User not found");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid password");

    const token = jwt.sign({ id: user._id, role: user.role });
    return { user, token };
  },

  resetPassword: async (userId, newPassword) => {
  const check = validatePassword(newPassword);
  
  if (!check.valid)
    throw new Error("Password tidak memenuhi syarat: " + check.errors.join(", "));

  const hashed = await bcrypt.hash(newPassword, 12);
  const user = await repo.findById(userId);

  user.password = hashed;
  await user.save();

  return user;
  }
};
