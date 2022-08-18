const express = require("express");

const authRoutes = express.Router();
const authController = require("./../controllers/authController");

authRoutes.route("/").post(authController.signup);
authRoutes
  .route("/verify/:userId/:uniqueString")
  .get(authController.verifyEmail);
authRoutes.route("/verified").get(authController.redirectPage);
authRoutes.route("/login").post(authController.login);
authRoutes.route("/logout").get(authController.logout);

module.exports = authRoutes;
