const express = require("express");

const followRoutes = express.Router();
const followController = require("../controllers/followController");
const authController = require("../controllers/authController");

followRoutes.route("/").get(followController.getAllMyFollow);
followRoutes
  .route("/check")
  .get(authController.isLoggedIn, followController.checkIsFollowed);

module.exports = followRoutes;
