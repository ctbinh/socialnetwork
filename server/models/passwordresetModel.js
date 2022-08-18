const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const passwordresetSchema = mongoose.Schema({
  userId: String,
  resetString: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: function () {
      return +new Date() + 1 * 60 * 60 * 1000;
    },
  },
});

passwordresetSchema.pre("save", async function (next) {
  this.resetString = await bcrypt.hash(this.resetString, 12);
  next();
});

const PasswordReset = mongoose.model("PasswordReset", passwordresetSchema);
module.exports = PasswordReset;
