import axios from "axios";

const TagService = {
  fetchPopularTags: async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_URL_SERVER}/api/tags`,
      });
      return res.data
    } catch (err) {
      return err.response.data;
    }
  },
};
export default TagService;
