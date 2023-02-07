require("dotenv").config({ path: "./.env" });
const app = require("./app");
const http = require("http");

const port = process.env.PORT || 5000;

const mongoose = require("mongoose");
const DB = process.env.DATABASE;
const socketServer = require("./socketServer");

const server = http.createServer(app);
socketServer.registerSocketServer(server);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successfully!");
  });

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
