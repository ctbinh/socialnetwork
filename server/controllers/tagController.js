const Tag = require('../models/tagModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllTags = catchAsync(async (req, res, next) => {
  const tags = await Tag.find().sort({ count: -1 }).limit(10);
  res.status(200).json({
    status: "success",
    results: tags.length,
    data: {
      tags,
    },
  });
})

exports.createTag = async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        article: newTag,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent!",
    });
  }
}