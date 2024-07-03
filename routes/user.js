const express = require("express");
const UserController = require("../controllers/userControllers");

const router = express.Router();

router.get("/", UserController.renderPage);
router.get("/signup", UserController.signUp);
router.get("/login", UserController.login);
router.post("/login", UserController.userLogin);
router.post("/signup", UserController.userSignUp);
router.get('/index', UserController.indexPage);
router.post("/logout", UserController.userLogout);
// router.post("/delete", UserController.deleteUser);

module.exports = router;