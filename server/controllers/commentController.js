const Comment = require("../models/commentModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.createComment = async (req, res) => {
  try {
    const newComment = await Comment.create(req.body);
    newComment.author = req.user;
    res.status(201).json({
      status: "success",
      data: {
        comment: newComment,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent!",
    });
  }
};

exports.getComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.status(201).json({
      status: "success",
      data: {
        comment,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(201).json({
      status: "success",
      data: {
        comments,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  const rootCommentId = req.body.rootCommentId;
  console.log(rootCommentId)
  if (!comment) {
    return next(new AppError("No user found with that id", 404));
  }
  if (`${comment.author._id}` !== `${req.user._id}`) {
    return next(new AppError("You are not allowed to delete", 405));
  }
  const deleted = await Comment.findByIdAndDelete(comment._id);
  if (rootCommentId) {
    await Comment.findByIdAndUpdate(rootCommentId, {
      $pull: { replies: req.params.id },
    });
  }
  if (!deleted) {
    return next(new AppError("No follow found with that id", 404));
  }
  await Comment.deleteMany({ _id: { $in: comment.replies } });
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.replyComment = catchAsync(async (req, res, next) => {
  const commentId = req.params.id;
  var newComment = await (await Comment.create(req.body))
    .populate({ path: "parent", select: "author body" })
    .execPopulate();
  newComment.author = req.user;
  await Comment.findByIdAndUpdate(commentId, {
    $push: { replies: newComment._id },
  });
  res.status(200).json({
    status: "success",
    data: {
      comment: newComment,
    },
  });
});

exports.likeComment = catchAsync(async (req, res, next) => {
  const commentId = req.params.id;
  const targetComment = await Comment.findById(commentId);
  if (!targetComment) {
    return next(new AppError("This comment does not exist!", 404));
  }
  let body = {};
  if (targetComment.likes.includes(req.user._id)) {
    body.$pull = { likes: req.user._id };
  } else {
    body.$push = { likes: req.user._id };
  }
  const updatedComment = await Comment.findByIdAndUpdate(commentId, body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      comment: updatedComment,
    },
  });
});

exports.loadReplies = catchAsync(async (req, res, next) => {
  const commentId = req.params.id;
  const targetComment = await Comment.findById(commentId).populate({
    path: "replies",
  });
  res.status(200).json({
    status: "success",
    data: {
      replies: targetComment.replies,
    },
  });
});
