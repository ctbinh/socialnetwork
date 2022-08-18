const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["Follow", "Like", "Comment", "Favorite", "Reply"],
      default: "Follow",
    },
    seen: {
      type: Boolean,
      default: false,
    },
    path: {
      type: String,
      required: [true, "Path is required"],
    },
    id: String,
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
