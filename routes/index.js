var express = require("express");
var router = express.Router();

const authController = require("../controllers/authController");
const blogController = require("../controllers/blogController");

router.get("/", function (req, res, next) {
  res.render("index", { user: req.user });
});

router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);

router.get("/login", authController.login_get);
router.post("/login", authController.login_post);

router.get("/logout", authController.logout);

router.get("/create_blog", blogController.blog_get);
router.post("/create_blog", blogController.blog_post);

module.exports = router;
