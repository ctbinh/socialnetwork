const express = require("express");

const articleRoutes = express.Router();
const articleController = require("../controllers/articleController");
const authController = require("../controllers/authController");

articleRoutes
  .route("/")
  .get(articleController.getAllArticles)
  .post(
    authController.protect,
    authController.isVerified,
    articleController.createArticle
  );

articleRoutes
  .route("/feed")
  .get(authController.protect, articleController.getFeedArticles);

articleRoutes
  .route("/:slug")
  .get(articleController.getArticle)
  .patch(
    authController.protect,
    authController.isVerified,
    articleController.updateArticle
  )
  .delete(
    authController.protect,
    authController.isVerified,
    articleController.deleteArticle
  );
articleRoutes
  .route("/:id/loadMoreComment")
  .get(articleController.loadMoreComment);

articleRoutes
  .route("/:slug/favorite")
  .patch(
    authController.protect,
    authController.isVerified,
    articleController.favoriteArticle
  );

module.exports = articleRoutes;
