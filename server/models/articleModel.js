const mongoose = require("mongoose");
const slugify = require("slugify");
const uniqueSlug = require("unique-slug");

const articleSchema = mongoose.Schema(
  {
    slug: {
      type: String,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    body: {
      type: String,
      required: [true, "Body is required"],
    },
    tagList: [String],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// articleSchema.virtual("comments", {
//   ref: "Comment",
//   foreignField: "article",
//   localField: "_id",
//   options: { sort: { createdAt: -1 } },
// });

// Document middleware: run before save(), create()
articleSchema.pre("save", async function (next) {
  const unique = uniqueSlug(new Date().getTime().toString());
  this.slug = slugify(this.title, { lower: true }) + `.${unique}`;
  next();
});

articleSchema.pre("findOneAndUpdate", async function (next) {
  try {
    if (this._update.title) {
      const unique = uniqueSlug(new Date().getTime().toString());
      this._update.slug = slugify(this._update.title, { lower: true }) + `.${unique}`;
    }
    next();
  } catch (err) {
    return next(err);
  }
});

articleSchema.pre(/^find/, function (next) {
  this.populate({
    path: "author",
    select: "username image level badgeDisplay",
  });
  next();
});
const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
