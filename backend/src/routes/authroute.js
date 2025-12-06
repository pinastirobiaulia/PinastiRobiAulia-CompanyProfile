const router = require("express").Router();
const controller = require("../controller/authcontroller");
const { auth } = require("../middlewares/auth");

router.post("/login", controller.login);
router.post("/reset-password", auth, controller.resetPassword);

module.exports = router;
