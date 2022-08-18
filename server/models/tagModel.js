const mongoose = require("mongoose");

const tagSchema = mongoose.Schema({
  tagName: String,
  count: {
    type: Number,
    default: 1,
  },
});

const Tag = mongoose.model("Tag", tagSchema);
module.exports = Tag;
