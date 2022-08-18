import axios from "axios";

const MissionService = {
  getAllMyMission: async (username) => {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_URL_SERVER}/api/missions`,
        params: {
          username,
        },
        withCredentials: true
      });
      return res.data
    } catch (err) {
      return err.response.data;
    }
  },
  claimReward: async (body) => {
    try {
      const res = await axios({
        method: "PATCH",
        url: `${process.env.REACT_APP_URL_SERVER}/api/missions`,
        data: body,
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  }
};
export default MissionService;
