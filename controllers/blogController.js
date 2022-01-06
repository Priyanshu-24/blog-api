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

exports.show_blog = async (req, res, next) => {
  const blogs = await Blog.find({}).sort({ date: -1 });
  res.render("index", { user: req.user, msgs: blogs });
};

exports.single_blog = async (req, res, next) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  res.render("single_blog", { user: req.user, blog: blog });
};

exports.post_comment = async (req, res, next) => {
  const { name, comments } = req.body;
  const { id } = req.params;

  const blog = await Blog.findById(id);
  const { comment } = blog;

  comment.push({ name, comments });

  const result = await Blog.findByIdAndUpdate(id, {comment});

  res.redirect(`/${id}`);
};

exports.delete_blog = async (req, res, next) => {
  const { id } = req.params;
  const response = await Blog.findByIdAndDelete(id);

  res.redirect("/");
};