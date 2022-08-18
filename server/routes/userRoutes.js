const express = require("express");

const userRoutes = express.Router();
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

userRoutes
  .route("/")
  .patch(authController.protect, userController.updateUser)
  .get(userController.getUser);
userRoutes
  .route("/getData")
  .post(authController.protect, userController.getData);
userRoutes
  .route("/verify")
  .get(authController.protect, userController.verifyEmail);
userRoutes
  .route("/requestResetPassword")
  .post(userController.requestResetPassword);
userRoutes.route("/resetPassword").post(userController.resetPassword);
userRoutes
  .route("/badges")
  .get(authController.protect, userController.getMyBadges);
userRoutes
  .route("/changePassword")
  .patch(authController.protect, userController.changePassword);
userRoutes
  .route("/changeEmail")
  .patch(authController.protect, userController.changeEmail);

module.exports = userRoutes;
