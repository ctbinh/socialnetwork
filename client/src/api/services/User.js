import axios from "axios";

const UserService = {
  signup: async (body) => {
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_URL_SERVER}/api/users`,
        data: body,
      });
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  },
  login: async (body) => {
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_URL_SERVER}/api/users/login`,
        withCredentials: true,
        data: body,
      });
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  },
  logout: async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_URL_SERVER}/api/users/logout`,
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.log(err.response.data);
    }
  },
  updateInfor: async (body) => {
    try {
      const res = await axios({
        method: "PATCH",
        url: `${process.env.REACT_APP_URL_SERVER}/api/user`,
        data: body,
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  },
  changePassword: async (body) => {
    try {
      const res = await axios({
        method: "PATCH",
        url: `${process.env.REACT_APP_URL_SERVER}/api/user/changePassword`,
        data: body,
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  },
  follow: async (username) => {
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_URL_SERVER}/api/profiles/follow`,
        data: {
          username,
        },
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  },
  unfollow: async (username) => {
    try {
      const res = await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_URL_SERVER}/api/profiles/follow`,
        data: {
          username,
        },
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  },
  fetchProfile: async (username) => {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_URL_SERVER}/api/profiles`,
        withCredentials: true,
        params: {
          username,
        },
      });
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  },
  getUser: async (username) => {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_URL_SERVER}/api/user`,
        params: {
          username,
        },
      });
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  },
  getMyBadges: async (username) => {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_URL_SERVER}/api/user/badges`,
        withCredentials: true,
        params: {
          username,
        },
      });
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  },
  verifyEmail: async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_URL_SERVER}/api/user/verify`,
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  },
  getUserData: async (fields) => {
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_URL_SERVER}/api/user/getData`,
        data: fields,
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  },
  sendResetPassword: async (body) => {
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_URL_SERVER}/api/user/requestResetPassword`,
        data: body,
      });
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  },
  resetPassword: async (body) => {
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_URL_SERVER}/api/user/resetPassword`,
        data: body,
      });
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  },
  changeEmail: async (body) => {
    try {
      const res = await axios({
        method: "PATCH",
        url: `${process.env.REACT_APP_URL_SERVER}/api/user/changeEmail`,
        data: body,
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  },
};
export default UserService;
