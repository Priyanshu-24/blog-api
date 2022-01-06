var express = require("express");
var router = express.Router();

const authController = require("../controllers/authController");
const blogController = require("../controllers/blogController");

router.get("/", blogController.show_blog);

router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);

router.get("/login", authController.login_get);
router.post("/login", authController.login_post);

router.get("/logout", authController.logout);

router.get("/create_blog", blogController.blog_get);
router.post("/create_blog", blogController.blog_post);

router.get("/:id", blogController.single_blog);
router.post("/comment_blog/:id", blogController.post_comment);

router.post("/delete_blog/:id", blogController.delete_blog);

module.exports = router;
