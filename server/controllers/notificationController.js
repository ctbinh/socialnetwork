const Notification = require("../models/notificationModel");
const catchAsync = require("../utils/catchAsync");

exports.getNumUnreadNotifications = catchAsync(async (req, res) => {
  const filter = { to: req.user._id, seen: false };
  const unreadNotificationCount = await Notification.countDocuments(filter);
  res.status(200).json({
    status: "success",
    data: {
      unreadNotificationCount,
    },
  });
});

exports.getMyNotifications = catchAsync(async (req, res) => {
  const filter = { to: req.user._id };
  const offset = parseInt(req.query.offset);
  const limit = parseInt(req.query.limit);
  const options = { limit };
  if (offset) {
    options.skip = (offset - 1) * limit;
  }
  const notifications = await Notification.find(filter, null, options)
    .populate([{ path: 'user', select: "image username" }, { path: 'article', select: "title slug" }])
    .sort({
      createdAt: -1,
    });
  const notificationCount = await Notification.countDocuments(filter);
  res.status(200).json({
    status: "success",
    results: notifications.length,
    data: {
      notifications,
      notificationCount,
    },
  });
});

exports.createNotification = catchAsync(async (req, res) => {
  try {
    await Notification.create(req.body);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent!",
    });
  }
});
