const express = require("express");

const commentRoutes = express.Router();
const commentController = require("../controllers/commentController");
const authController = require("../controllers/authController");

commentRoutes
  .route("/")
  .post(
    authController.protect,
    authController.isVerified,
    commentController.createComment
  )
  .get(commentController.getAllComments);

commentRoutes
  .route("/:id/reply")
  .patch(
    authController.protect,
    authController.isVerified,
    commentController.replyComment
  );

commentRoutes
  .route("/:id/like")
  .patch(
    authController.protect,
    authController.isVerified,
    commentController.likeComment
  );

commentRoutes
  .route("/:id")
  .delete(
    authController.protect,
    authController.isVerified,
    commentController.deleteComment
  )
  .get(commentController.loadReplies);
module.exports = commentRoutes;
