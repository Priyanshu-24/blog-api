const Blog = require("../models/Blog");
const { body, validationResult } = require("express-validator");
const moment = require("moment");

exports.blog_get = (req, res, next) => {
  if (req.user) res.render("create_blog", { user: req.user });
  else res.redirect("/");
};

exports.blog_post = async (req, res, next) => {

    const { title, blog } = req.body;
    const date = new Date();
    const formatDate = moment().format("MMMM Do YYYY, dddd");

    const newBlog = await Blog.create({
        title,
        body: blog,
        name: req.user.username,
        timestamp: formatDate
    });

    res.redirect("/");
    
}