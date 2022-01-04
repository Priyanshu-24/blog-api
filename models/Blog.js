const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Blog = new Schema({

  title: { type: String, required: true },
  body: { type: String, required: true },
  name: { type: String, required: true },
  timestamp: { type: String, required: false },
  comment: { type: Array }

});

module.exports = mongoose.model("Blog", Blog);
