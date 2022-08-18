const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userverificationSchema = mongoose.Schema({
  userId: String,
  uniqueString: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: function () {
      return +new Date() + 6 * 60 * 60 * 1000;
    },
  },
});

userverificationSchema.pre("save", async function (next) {
  this.uniqueString = await bcrypt.hash(this.uniqueString, 12);
  next();
});

const UserVerification = mongoose.model(
  "UserVerification",
  userverificationSchema
);
module.exports = UserVerification;
