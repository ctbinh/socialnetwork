const express = require("express");

const missionRoutes = express.Router();
const authController = require("./../controllers/authController");
const missionController = require("./../controllers/missionController");

missionRoutes
  .route("/")
  .get(authController.protect, missionController.getAllMyMission)
  .post(missionController.createMission)
  .patch(authController.protect, missionController.claimReward);

module.exports = missionRoutes;
