const mongoose = require("mongoose");

const missionSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
  },
  type: {
    type: String,
    enum: ["Counting", "Counting Field", "Comparison"],
    default: "Counting",
  },
  reward: {
    name: {
      type: String,
      required: [true, "Name of reward is required"],
    },
    icon: {
      type: String,
      required: [true, "Icon of reward is required"],
    },
    value: Number,
  },
  expected: {
    type: Number,
    required: [true, "Expected field is required"],
  },
  achieved: {
    type: Number,
    default: 0,
  },
  collected: {
    type: Boolean,
    default: false,
  },
  schemaName: {
    type: String,
    required: [true, "Schema name field is required"],
  },
  condition: [
    {
      typeCond: String,
      field: String,
      fieldIsArray: {
        type: Boolean,
        default: false,
      },
      value: mongoose.Schema.Types.Mixed,
    },
  ],
});

const Mission = mongoose.model("Mission", missionSchema);

module.exports = Mission;
