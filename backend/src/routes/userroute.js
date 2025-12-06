const router = require("express").Router();
const controller = require("../controller/usercontroller");
const { auth, adminOnly } = require("../middlewares/auth");

router.post("/", auth, adminOnly, controller.createUser);
router.get("/", auth, adminOnly, controller.getAllUsers);
router.get("/:id", auth, adminOnly, controller.getUserById);
router.put("/:id", auth, adminOnly, controller.updateUser);
router.delete("/:id", auth, adminOnly, controller.deleteUser);

module.exports = router;
