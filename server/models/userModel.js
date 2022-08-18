const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const expNeededs = [10, 20, 30, 40, 50, 60, 70, Infinity, Infinity, Infinity];

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      match: [/^[a-zA-Z0-9]+$/, "Invalid username"],
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Confirm password is required"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same!",
      },
    },
    email: {
      type: String,
      unique: true,
      index: true,
      required: [true, "Email is required"],
      validate: [validator.isEmail, "Invalid email"],
      lowercase: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    bio: String,
    image: {
      type: String,
      default: "https://pbs.twimg.com/media/FDhSXKeWYAYx5ha.jpg",
    },
    bgImage: {
      type: String,
      default:
        "https://photojeepers.com/wp-content/uploads/2020/05/best-summer-hiking-trails-in-the-us.jpg",
    },
    totalLikes: {
      type: Number,
      default: 0,
    },
    curExp: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 0,
    },
    expNeeded: {
      type: Number,
      default: 10,
    },
    missionCollected: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mission",
      },
    ],
    badges: [String],
    badgeDisplay: String,
    passwordChangeAt: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  // Just for inc exp
  try {
    if (!this._update?.$inc) {
      return;
    }
    const docToUpdate = await this.model.findOne(this.getQuery());
    if (
      docToUpdate.curExp + this._update.$inc.curExp >=
      docToUpdate.expNeeded
    ) {
      this._update.level = docToUpdate.level + 1;
      this._update.$inc.curExp =
        this._update.$inc.curExp - docToUpdate.expNeeded;
      this._update.expNeeded = expNeededs[docToUpdate.level + 1];
      if (docToUpdate.badgeDisplay === undefined) {
        this._update.badgeDisplay = "Level";
      }
      if (!docToUpdate.badges.includes("Level")) {
        this._update.badges = docToUpdate.badges + ["Level"];
      }
    } else if (docToUpdate.curExp + this._update.$inc.curExp < 0) {
      if (docToUpdate.level > 0) {
        this._update.level = docToUpdate.level - 1;
        this._update.expNeeded = expNeededs[docToUpdate.level - 1];
        this._update.$inc.curExp = expNeededs[docToUpdate.level - 1] - 1;
      } else {
        this._update.$inc.curExp = 0;
      }
    }
    next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangeAt) {
    const changedTimestamp = parseInt(this.passwordChangeAt.getTime() / 1000);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
