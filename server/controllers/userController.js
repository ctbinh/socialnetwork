const Follow = require("../models/followModel");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const UserVerification = require("../models/userverificationModel");
const PasswordReset = require("./../models/passwordresetModel");
const bcrypt = require("bcryptjs");

const nodemailer = require("nodemailer");

const { v4: uuidv4 } = require("uuid");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD_EMAIL,
  },
});
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready for messages");
  }
});

const sendPasswordReset = catchAsync(
  async ({ _id, email }, redirectUrl, res) => {
    const resetString = uuidv4() + _id;
    await PasswordReset.deleteMany({ userId: _id });
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Reset Your Password",
      html: `<p>Reset your password <a href="${redirectUrl}/${_id}/${resetString}">here</a></p>`,
    };
    await PasswordReset.create({
      userId: _id,
      resetString,
    });
    await transporter.sendMail(mailOptions);
    res.status(201).json({
      status: "success",
      message: "Password reset email sent",
    });
  }
);
exports.resetPassword = catchAsync(async (req, res, next) => {
  let { userId, resetString, newPassword } = req.body;
  const passwordReset = await PasswordReset.findOne({ userId });
  if (!passwordReset) {
    return next(new AppError("Password reset request not found", 404));
  }
  const { expiresAt } = passwordReset;
  const hashedResetString = passwordReset.resetString;
  if (expiresAt < Date.now()) {
    await PasswordReset.findOneAndDelete({ userId });
    return res.status(400).json({
      status: "error",
      message: "Password reset link has expired",
    });
  }
  const validString = await bcrypt.compare(resetString, hashedResetString);
  if (validString) {
    const user = await User.findById(userId);
    user.password = newPassword;
    user.passwordConfirm = newPassword;
    user.passwordChangeAt = new Date();
    await user.save();
    await PasswordReset.findOneAndDelete({ userId });
    res.status(200).json({
      status: "success",
      message: "Password has been reset successfully",
    });
  } else {
    res.status(400).json({
      status: "error",
      message: "Invalid password reset details passed",
    });
  }
});

exports.requestResetPassword = catchAsync(async (req, res, next) => {
  const { email, redirectUrl } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("No user found with that email", 404));
  }
  if (!user.verified) {
    return res.status(403).json({
      status: "error",
      message: "Your account hasn't been verified!",
    });
  } else {
    sendPasswordReset(user, redirectUrl, res);
  }
});

exports.verifyEmail = catchAsync(async (req, res, next) => {
  if (req.user.verified) {
    return res.status(200).json({
      status: "warning",
      message: "Your account has already been verified!",
    });
  }
  const uniqueString = uuidv4() + req.user._id;
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: req.user.email,
    subject: "Verify Your Email",
    html: `<p>Verify your email <a href="${process.env.BACKEND_URL}/api/users/verify/${req.user._id}/${uniqueString}">here</a></p>`,
  };
  await UserVerification.deleteMany({ userId: req.user._id });
  await UserVerification.create({
    userId: req.user._id,
    uniqueString,
  });
  await transporter.sendMail(mailOptions);
  res.status(201).json({
    status: "success",
    message: "Verification email sent",
  });
});

exports.createUser = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ username: req.query.username });
  if (!user) {
    return next(new AppError("No user found with that username", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.getProfile = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ username: req.query.username });
  if (!user) {
    return next(new AppError("No user found with that username", 404));
  }
  const followers = await Follow.countDocuments({ to: user._id });
  const following = await Follow.countDocuments({ from: user._id });
  const follow = await Follow.findOne({ from: req.user?._id, to: user._id });
  res.status(200).json({
    status: "success",
    data: {
      profile: {
        user,
        followers,
        following,
        followed: follow ? true : false,
      },
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  let emptyFields = [];
  const { username, email } = req.body;
  if (email) {
    return next(new AppError("Something went wrong!", 400));
  }
  if (username === "") {
    emptyFields.push("username");
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
  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(new AppError("No user found with that id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.changePassword = catchAsync(async (req, res, next) => {
  let emptyFields = [];
  const { curPassword, newPassword, confirmPassword } = req.body;
  if (curPassword === "") {
    emptyFields.push("curPassword");
  }
  if (newPassword === "") {
    emptyFields.push("newPassword");
  }
  if (confirmPassword === "") {
    emptyFields.push("confirmPassword");
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
  const user = await User.findById(req.user._id).select("+password");
  if (!user) {
    return next(new AppError("No user found with that id", 404));
  }
  if (!(await user.correctPassword(req.body.curPassword, user.password))) {
    return next(new AppError("Your current password is wrong.", 401));
  }
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.confirmPassword;
  user.passwordChangeAt = new Date();
  await user.save();
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.getMyBadges = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ username: req.query.username }).select(
    "badges level curExp expNeeded badgeDisplay"
  );
  if (!user) {
    return next(new AppError("No user found with that username", 404));
  }
  if (`${req.user._id}` !== `${user._id}`) {
    return next(new AppError("You are not allowed to view this field", 403));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.getData = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select(req.body);
  if (!user) {
    return next(new AppError("No user found with that username", 404));
  }
  if (`${req.user._id}` !== `${user._id}`) {
    return next(new AppError("You are not allowed to view this field", 403));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.changeEmail = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findById(req.user._id).select("+password");
  if (!user) {
    return next(new AppError("No user found with that id", 404));
  }
  if (!(await user.correctPassword(password, user.password))) {
    return next(new AppError("Password is wrong.", 401));
  }
  const existUsername = await User.findOne({email})
  if(existUsername) {
    return res.status(400).json({
      status: "error",
      message: "Email already exist!",
    });
  }
  const userUpdated = await User.findByIdAndUpdate(req.user._id, {email, verified: false}, {
    new: true,
    runValidators: true,
  });
  if (!userUpdated) {
    return next(new AppError("No user found with that id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user: userUpdated,
    },
  });
});
