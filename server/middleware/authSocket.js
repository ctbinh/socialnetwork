const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const config = process.env;

exports.verifyTokenSocket = (socket, next) => {
  const token = socket.handshake.auth?.token;
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    socket.user = decoded;
  } catch (err) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }
  next()
};
