import io from "socket.io-client";
import store from "../store/index";
import { notificationActions } from "../store/notification";
let socket = null;

export const connectWithSocketServer = (token = null) => {
  socket = io(process.env.REACT_APP_URL_SERVER, {
    auth: {
      token,
    },
  });
  socket.on("connect", () => {
    console.log("successfully connected with socket.io server");
    console.log(socket.id);
  });
  socket.on("notifications", (data) => {
    const { unreadNotificationCount } = data;
    store.dispatch(notificationActions.setUnreadNum(unreadNotificationCount));
  });
};
