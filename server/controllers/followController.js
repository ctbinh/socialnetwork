const Follow = require("../models/followModel");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.createFollow = catchAsync(async (req, res, next) => {
  const userIsFollowed = await User.findOne({ username: req.body.username });
  if (!userIsFollowed) {
    return next(new AppError("No user found with that username", 404));
  }
  const newFollow = await Follow.create({
    from: req.user._id,
    to: userIsFollowed._id,
  });
  res.status(201).json({
    status: "success",
    data: {
      follow: newFollow,
      user: userIsFollowed
    },
  });
});

exports.getAllMyFollow = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ username: req.query.username });
  if (!user) {
    return next(new AppError("No user found with that username", 404));
  }
  const followers = await Follow.find({ to: user._id }).select("-to").populate({
    path: "from",
    select: "username image",
  });
  const following = await Follow.find({ from: user._id })
    .select("-from")
    .populate({
      path: "to",
      select: "username image",
    });
  res.status(200).json({
    status: "success",
    data: {
      followers,
      following,
    },
  });
});

exports.checkIsFollowed = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ username: req.query.username });
  if (!user) {
    return next(new AppError("No user found with that username", 404));
  }
  const follow = await Follow.findOne({ from: req.user._id, to: user._id });
  if (follow) {
    res.status(200).json({
      data: {
        isFollowed: true,
      }
    });
  }
  else {
    res.status(200).json({
      data: {
        isFollowed: false,
      }
    });
  }
});

exports.deleteFollow = catchAsync(async (req, res, next) => {
  const userIsFollowed = await User.findOne({ username: req.body.username });
  if (!userIsFollowed) {
    return next(new AppError("No user found with that username", 404));
  }
  const follow = await Follow.findOneAndDelete({
    from: req.user._id,
    to: userIsFollowed._id,
  })
  if (!follow) {
    return next(new AppError("No follow found with that id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user: userIsFollowed
    },
  });
});