const mongoose = require("mongoose");

const Publications = mongoose.model("Publications", {
  title: String,
  description: String,
  price: Number,
  created: Date,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = Publications;
