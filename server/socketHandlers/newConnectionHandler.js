const serverStore = require('../serverStore')
const newConnectionHandler = (socket, io) => {
  const user = socket.user
  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: user.id
  })
}

module.exports = newConnectionHandler