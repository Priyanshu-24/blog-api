require("dotenv").config();

const User = require("../models/User");

const bcrypt = require("bcrypt");
const passport = require("passport");

exports.signup_get = (req, res, next) => {
  res.render("signup", { user: req.user, err: null });
};

exports.login_get = (req, res, next) => {
  res.render("login", { user: req.user, msg: null });
};

exports.signup_post = async (req, res, next) => {

  const { username, password, admin_code } = req.body;
  const existentUser = await User.findOne({ username });

  if (admin_code !== process.env.ADMIN_PASSCODE)
    res.render("signup", {
      user: req.user,
      err: "Admin passcode doesnot match",
    });

  else if (existentUser)
    res.render("signup", {
      user: req.user,
      err: "Username already present",
    });

  else {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userResponse = await User.create({
      username,
      password: hashedPassword,
    });

    if (!userResponse)
      res.render("signup", {
        user: req.user,
        err: "Error while Signing Up",
      });

    else
      res.render("login", {
        user: req.user,
        msg: "Successfully registered! Now login as an admin",
      });
  }

};

exports.login_post = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  req.logout();
  res.redirect("/");
};
