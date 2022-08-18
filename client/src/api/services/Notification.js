import axios from "axios";

const NotificationService = {
  fetchMyNoti: async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_URL_SERVER}/api/notifications?limit=10&offset=1`,
        withCredentials: true
      });
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  },
  getNumUnreadNotifications: async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_URL_SERVER}/api/notifications/unread`,
        withCredentials: true
      });
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  }
};
export default NotificationService;
