const express = require("express");

const tagRoutes = express.Router();

const tagController = require("../controllers/tagController");

tagRoutes
  .route("/")
  .get(tagController.getAllTags)
  .post(tagController.createTag);

module.exports = tagRoutes;
