const Notification = require("../../models/notificationModel");
const serverStore = require("../../serverStore");
const updateNotifications = async (userId) => {
  try {
    const filter = { to: userId, seen: false };
    const unreadNotificationCount = await Notification.countDocuments(filter);
    const receiverList = serverStore.getActiveConnections(userId);
    const io = serverStore.getSocketServerInstance();
    receiverList.forEach((receiverSocketId) => {
      io.to(receiverSocketId).emit("notifications", {
        unreadNotificationCount,
      });
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { updateNotifications };
