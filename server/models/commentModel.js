const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  body: {
    type: String,
    required: [true, "Body is required"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Author is required"],
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
    required: [true, "Article is required"],
  },
  isReply: {
    type: Boolean,
    default: false,
    required: [true, "isReply is required"],
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ]
});

commentSchema.pre(/^find/, function (next) {
  this.populate([
    {
      path: "author",
      select: "username image badgeDisplay level",
    },
    {
      path: "parent",
      select: "author body",
    },
  ]);
  next();
});
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
