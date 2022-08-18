const mongoose = require("mongoose");

const followSchema = mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { strict: false }
);

followSchema.index({ from: 1, to: 1 }, { unique: true });
const Follow = mongoose.model("Follow", followSchema);

module.exports = Follow;
