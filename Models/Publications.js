const mongoose = require("mongoose");

const Publications = mongoose.model("Publications", {
  title: {
    type: String,
    minlength: 1,
    maxlength: 50,
    require: true
  },
  description: {
    type: String,
    minlength: 1,
    maxlength: 500,
    require: true
  },
  price: {
    type: Number,
    min: 0,
    max: 100000
  },

  created: {
    type: Date,
    default: Date.now
  },

  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = Publications;
