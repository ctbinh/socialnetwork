const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const articleRouter = require("./routes/articleRoutes");
const tagRouter = require("./routes/tagRoutes");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const commentRouter = require("./routes/commentRoutes");
const AppError = require("./utils/AppError");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const profileRouter = require("./routes/profileRoutes");
const followRouter = require("./routes/followRoutes");
const missionRouter = require("./routes/missionRoutes");
const notificationRouter = require('./routes/notificationRoutes')

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.static("public"));
app.use(
  cors({
    origin: [
      "https://binhct.internship.designveloper.com",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

app.use(helmet());

app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/articles", articleRouter);
app.use("/api/tags", tagRouter);
app.use("/api/users", authRouter);
app.use("/api/user", userRouter);
app.use("/api/profiles", profileRouter);
app.use("/api/:slug/comments", commentRouter);
app.use("/api/follows", followRouter);
app.use("/api/missions", missionRouter);
app.use("/api/notifications", notificationRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
