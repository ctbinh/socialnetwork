const Article = require("../models/articleModel");
const User = require("../models/userModel");
const Follow = require("../models/followModel");
const Tag = require("../models/tagModel");
const AppError = require("../utils/AppError");
const Comment = require("../models/commentModel");
const catchAsync = require("../utils/catchAsync");
const Notification = require("../models/notificationModel");

exports.createArticle = catchAsync(async (req, res, next) => {
  let emptyFields = [];
  const { title, body, description, thumbnail } = req.body;
  if (!title) {
    emptyFields.push("title");
  }
  if (!body) {
    emptyFields.push("body");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!thumbnail) {
    emptyFields.push("thumbnail");
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({
      status: "error",
      message: "Please fill in all the fields.",
      data: {
        emptyFields,
      },
    });
  }
  const newArticle = await Article.create(req.body);
  if (newArticle) {
    Promise.all(
      newArticle.tagList.map(async (item) => {
        const tag = await Tag.findOne({ tagName: item });
        if (tag) {
          await Tag.findByIdAndUpdate(tag._id, {
            count: tag.count + 1,
          });
        } else {
          await Tag.create({ tagName: item });
        }
      })
    );
  }
  res.status(201).json({
    status: "success",
    data: {
      article: newArticle,
    },
  });
});

exports.getAllArticles = catchAsync(async (req, res, next) => {
  const filter = {};
  const offset = parseInt(req.query.offset);
  const limit = parseInt(req.query.limit);
  const options = { limit };
  if (req.query.author) {
    const user = await User.findOne({ username: req.query.author });
    if (!user) {
      return next(new AppError("No user found with that id", 404));
    }
    filter.author = user._id;
  }
  if (req.query.tag) {
    filter.tagList = {
      $in: [req.query.tag],
    };
  }
  if (req.query.favorited) {
    const user = await User.findOne({ username: req.query.favorited });
    filter.favorites = {
      $in: [user._id],
    };
  }
  if (offset) {
    options.skip = (offset - 1) * limit;
  }
  const articles = await Article.find(filter, null, options).sort({
    createdAt: -1,
  });
  const articleCount = await Article.countDocuments(filter);
  res.status(200).json({
    status: "success",
    results: articles.length,
    data: {
      articles,
      articleCount,
    },
  });
});

exports.getArticle = catchAsync(async (req, res, next) => {
  const offset = parseInt(req.query.offset);
  const limit = parseInt(req.query.limit);
  const article = await Article.findOne({ slug: req.params.slug });
  if (!article) {
    return next(new AppError("No article found with that slug", 404));
  }
  const comments = await Comment.find(
    {
      article: article._id,
      isReply: false,
    },
    null,
    {
      skip: (offset - 1) * limit,
      limit: limit,
      sort: { createdAt: -1 },
    }
  );
  const countComment = await Comment.countDocuments({
    article: article._id,
    isReply: false,
  });
  res.status(200).json({
    status: "success",
    data: {
      article,
      comments,
      countComment,
    },
  });
});

exports.loadMoreComment = catchAsync(async (req, res, next) => {
  const offset = parseInt(req.query.offset);
  const limit = parseInt(req.query.limit);
  const articleId = req.params.id;
  const comments = await Comment.find(
    {
      article: articleId,
      isReply: false,
    },
    null,
    {
      skip: (offset - 1) * limit,
      limit: limit,
      sort: { createdAt: -1 },
    }
  );
  res.status(200).json({
    status: "success",
    data: {
      comments,
    },
  });
});

exports.updateArticle = catchAsync(async (req, res, next) => {
  let emptyFields = [];
  const { title, body, description, thumbnail } = req.body;
  if (title === "") {
    emptyFields.push("title");
  }
  if (body === "") {
    emptyFields.push("body");
  }
  if (description === "") {
    emptyFields.push("description");
  }
  if (thumbnail === "") {
    emptyFields.push("thumbnail");
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({
      status: "error",
      message: "Please fill in all the fields.",
      data: {
        emptyFields,
      },
    });
  }
  const curArticle = await Article.findOne({ slug: req.params.slug });
  if (`${req.user._id}` !== `${curArticle.author._id}`) {
    return next(new AppError("You are not allowed to edit this article", 405));
  }
  Promise.all(
    req.body.tagList
      .map(async (item) => {
        if (!curArticle.tagList.includes(item)) {
          const tag = await Tag.findOne({ tagName: item });
          if (tag) {
            await Tag.findByIdAndUpdate(tag._id, {
              count: tag.count + 1,
            });
          } else {
            await Tag.create({ tagName: item });
          }
        }
      })
      .concat(
        curArticle.tagList.map(async (item) => {
          if (!req.body.tagList.includes(item)) {
            const tag = await Tag.findOne({ tagName: item });
            if (tag.count === 1) {
              await Tag.findOneAndDelete({ tagName: item });
            } else {
              await Tag.findByIdAndUpdate(tag._id, {
                count: tag.count - 1,
              });
            }
          }
        })
      )
  );
  const article = await Article.findOneAndUpdate(
    { slug: curArticle.slug },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!article) {
    return next(new AppError("No article found with that id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      article,
    },
  });
});

exports.deleteArticle = catchAsync(async (req, res, next) => {
  const curArticle = await Article.findOne({ slug: req.params.slug });
  if (`${req.user._id}` !== `${curArticle.author._id}`) {
    return next(
      new AppError("You are not allowed to delete this article", 405)
    );
  }
  const article = await Article.findOneAndDelete({ slug: req.params.slug });
  if (!article) {
    return next(new AppError("No article found with that id", 404));
  } else {
    Promise.all(
      curArticle.tagList.map(async (item) => {
        const tag = await Tag.findOne({ tagName: item });
        if (tag.count === 1) {
          await Tag.findOneAndDelete({ tagName: item });
        } else {
          await Tag.findByIdAndUpdate(tag._id, {
            count: tag.count - 1,
          });
        }
      })
    );
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getFeedArticles = catchAsync(async (req, res, next) => {
  const offset = parseInt(req.query.offset);
  const limit = parseInt(req.query.limit);
  const options = { limit };
  const follows = await Follow.find({ from: req.user._id }).select("to -_id");
  if (offset) {
    options.skip = (offset - 1) * limit;
  }
  const articles = await Article.find(
    {
      author: { $in: follows.map((item) => item.to) },
    },
    null,
    options
  ).sort({ createdAt: -1 });
  const articleCount = await Article.countDocuments({
    author: { $in: follows.map((item) => item.to) },
  });
  res.status(200).json({
    status: "success",
    data: { articles, articleCount },
  });
});

exports.favoriteArticle = catchAsync(async (req, res, next) => {
  var options = {
    $addToSet: { favorites: req.user._id },
  };
  var x = 1;
  const curArticle = await Article.findOne({ slug: req.params.slug });
  if (curArticle.favorites.includes(req.user._id)) {
    options = {
      $pull: { favorites: req.user._id },
    };
    x = -1;
  } else if (`${req.user._id}` !== `${curArticle.author._id}`) {
    await Notification.create({
      to: curArticle.author._id,
      type: "Favorite",
      path: "/article",
      article: curArticle._id,
      user: req.user._id
    });
  }
  await User.findOneAndUpdate(
    { _id: curArticle.author._id },
    {
      $inc: { totalLikes: x, curExp: x },
    }
  );

  const article = await Article.findOneAndUpdate(
    { slug: req.params.slug },
    options,
    {
      new: true,
      runValidators: true,
    }
  ).populate({ path: "comments", match: { isReply: false } });
  res.status(200).json({
    status: "success",
    data: { article },
  });
});
