const express = require("express");

const notificationRoutes = express.Router();

const notificationController = require("../controllers/notificationController");
const authController = require("../controllers/authController");

notificationRoutes
  .route("/")
  .get(authController.protect, notificationController.getMyNotifications);

  notificationRoutes
  .route("/unread")
  .get(authController.protect, notificationController.getNumUnreadNotifications);

module.exports = notificationRoutes;
