const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const UserVerification = require("../models/userverificationModel");
const path = require("path");
const bcrypt = require("bcryptjs");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.verifyEmail = catchAsync(async (req, res, next) => {
  const { userId, uniqueString } = req.params;
  const user = User.findById(userId);
  if (user.verified) {
    const message = "Account has already been verified";
    return res.redirect(`/api/users/verified?error=true&message=${message}`);
  }
  const verification = await UserVerification.findOne({
    userId,
  });
  if (!verification) {
    const message = "Account has already been verified";
    return res.redirect(`/api/users/verified?error=true&message=${message}`);
  }
  const { expiresAt } = verification;
  const hashedUniqueString = verification.uniqueString;
  if (expiresAt < Date.now()) {
    await UserVerification.findOneAndDelete({ userId });
    const message = "Verification has expired";
    return res.redirect(`/api/users/verified?error=true&message=${message}`);
  } else {
    const validString = await bcrypt.compare(uniqueString, hashedUniqueString);
    if (validString) {
      await User.findByIdAndUpdate(userId, { verified: true });
      await UserVerification.findOneAndDelete({ userId });
      return res
        .set(
          "Content-Security-Policy",
          "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'"
        )
        .sendFile(path.join(__dirname, "./../verified.html"));
    } else {
      const message = "Invalid verification";
      return res.redirect(`/api/users/verified?error=true&message=${message}`);
    }
  }
});

exports.redirectPage = (req, res) => {
  res
    .set(
      "Content-Security-Policy",
      "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'"
    )
    .sendFile(path.join(__dirname, "./../verified.html"));
};

exports.signup = catchAsync(async (req, res, next) => {
  let emptyFields = [];
  const { username, email, password, passwordConfirm } = req.body;
  if (username === "") {
    emptyFields.push("username");
  }
  if (email === "") {
    emptyFields.push("email");
  }
  if (password === "") {
    emptyFields.push("password");
  }
  if (passwordConfirm === "") {
    emptyFields.push("passwordConfirm");
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({
      status: "error",
      message: "Please fill in all the fields.",
      data: {
        emptyFields,
      },
    });
  }
  const existUsername = await User.findOne({username})
  if(existUsername) {
    return res.status(400).json({
      status: "error",
      message: "Username already exist!",
    });
  }
  const existEmail = await User.findOne({email})
  if(existEmail) {
    return res.status(400).json({
      status: "error",
      message: "Email already exist!",
    });
  }
  const newUser = await User.create(req.body);
  const token = signToken(newUser._id);
  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password!", 401));
  }
  user.password = null;
  const token = signToken(user._id);
  const tokenExpireIn = new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000
  );
  const cookieOptions = {
    expires: tokenExpireIn,
    httpOnly: true,
    secure: true,
  };
  res.cookie("jwt", token, cookieOptions);
  res.status(200).json({
    status: "success",
    token,
    user,
    tokenExpireIn,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }
  req.user = freshUser;
  next();
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  let token;
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      return next();
    }
    if (freshUser.changedPasswordAfter(decoded.iat)) {
      return next();
    }
    req.user = freshUser;
    return next();
  }
  next();
});

exports.isVerified = catchAsync(async (req, res, next) => {
  if(!req.user.verified) {
    return next(
      new AppError("Please verify your email to use this feature.", 403)
    );
  }
  next();
});

exports.logout = catchAsync(async (req, res) => {
  res.cookie("jwt", "logged out", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
});
