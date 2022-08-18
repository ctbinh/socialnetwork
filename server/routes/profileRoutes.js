const express = require("express");

const profileRoutes = express.Router();
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const followController = require("../controllers/followController");

profileRoutes.route("/").get(authController.isLoggedIn, userController.getProfile);
profileRoutes
  .route("/follow")
  .post(authController.protect, followController.createFollow)
  .delete(authController.protect, followController.deleteFollow);

module.exports = profileRoutes;
