import axios from "axios";

const CommentService = {
  postComment: async (slug, body) => {
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_URL_SERVER}/api/${slug}/comments`,
        data: body,
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  },
  replyComment: async (slug, commentId, body) => {
    try {
      const res = await axios({
        method: "PATCH",
        url: `${process.env.REACT_APP_URL_SERVER}/api/${slug}/comments/${commentId}/reply`,
        data: body,
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  },
  deleteComment: async (slug, commentId, rootCommentId = null) => {
    try {
      const res = await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_URL_SERVER}/api/${slug}/comments/${commentId}`,
        data: { rootCommentId },
        withCredentials: true,
      });
      return res;
    } catch (err) {
      return err.response.data;
    }
  },
  likeComment: async (slug, commentId) => {
    try {
      const res = await axios({
        method: "PATCH",
        url: `${process.env.REACT_APP_URL_SERVER}/api/${slug}/comments/${commentId}/like`,
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  },
  loadReplies: async (slug, commentId) => {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_URL_SERVER}/api/${slug}/comments/${commentId}`,
      });
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  },
};
export default CommentService;
