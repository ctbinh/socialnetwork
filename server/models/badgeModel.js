const mongoose = require("mongoose");

const badgeSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  icon: {
    type: String,
    required: [true, "Icon is required"],
  },
  kind: {
    type: String,
    required: [true, "Kind is required"],
  },
});

const Badge = mongoose.model("Badge", badgeSchema);

module.exports = Badge;
