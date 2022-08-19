const authSocket = require('./middleware/authSocket');
const disconnectHandler = require('./socketHandlers/disconnectHandler');
const newConnectionHandler = require('./socketHandlers/newConnectionHandler');
const serverStore = require('./serverStore')
const registerSocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  serverStore.setSocketServerInstance(io)
  io.use((socket, next) => {
    authSocket.verifyTokenSocket(socket, next)
  })
  io.on('connection', (socket) => {
    console.log('User connected')
    console.log(socket.id)
    newConnectionHandler(socket, io)

    socket.on('disconnect', () => {
      console.log('User disconnected')
      disconnectHandler(socket)
    })
  })
};
module.exports = {
  registerSocketServer
}
