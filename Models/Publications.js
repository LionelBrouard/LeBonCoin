const mongoose = require("mongoose");

const Publications = mongoose.model("Publications", {
  //   _id: ObjectId,
  title: String,
  description: String,
  price: Number,
  created: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  // _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = Publications;
